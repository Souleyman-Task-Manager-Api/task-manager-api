import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Credential, Token } from '../model/entity';
import { Builder } from 'builder-pattern';
import { configManager } from '../../common/config/config.manager';
import { ConfigKey } from '../../common/config/enum';
import { RefreshTokenPayload } from '../model/payload';
import { TokenExpiredException, TokenGenerationException } from '../security.exception';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @InjectRepository(Token) private readonly repository: Repository<Token>,
    @InjectRepository(Credential) private readonly credentialRepository: Repository<Credential>,
    private jwtService: JwtService
  ) {}

  async getTokens(credential: Credential): Promise<Token> {
    try {
      await this.repository.delete({ credential });
      const payload = { sub: credential.credential_id };
      
      // Valeurs par défaut si les configs n'existent pas
      const tokenSecret = configManager.getValue(ConfigKey.JWT_TOKEN_SECRET) || 'defaultTokenSecret123456789';
      const tokenExpire = configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN) || '1h';
      const refreshSecret = configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET) || 'defaultRefreshSecret123456789';
      const refreshExpire = configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN) || '7d';
      
      const token = await this.jwtService.signAsync(payload, {
        secret: tokenSecret,
        expiresIn: tokenExpire as any
      });
      
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: refreshExpire as any
      });
      
      const newToken = Builder<Token>()
        .token(token)
        .refreshToken(refreshToken)
        .credential(credential)
        .build();
      
      await this.repository.upsert(newToken, ['credential']);
      
      const savedToken = await this.repository.findOneBy({ token });
      if (!savedToken) {
        throw new TokenGenerationException();
      }
      return savedToken;
    } catch (e) {
      this.logger.error('Token generation error: ' + e.message);
      throw new TokenGenerationException();
    }
  }

  async deleteFor(credential: Credential): Promise<void> {
    await this.repository.delete({ credential });
  }

  async refresh(payload: RefreshTokenPayload): Promise<Token> {
    try {
      const refreshSecret = configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET) || 'defaultRefreshSecret123456789';
      const { sub: id } = this.jwtService.verify(payload.refresh, {
        secret: refreshSecret
      });
      const credential = await this.credentialRepository.findOneBy({ credential_id: id });
      if (!credential) {
        throw new TokenExpiredException();
      }
      return await this.getTokens(credential);
    } catch (e) {
      this.logger.error('Refresh error: ' + e.message);
      throw new TokenExpiredException();
    }
  }
}