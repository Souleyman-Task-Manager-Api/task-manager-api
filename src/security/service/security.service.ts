import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential, Token } from '../model/entity';
import { TokenService } from '../jwt/token.service';
import { comparePassword, encryptPassword } from '../utils/password.decoder';
import { isNil } from 'lodash';
import { 
  UserNotFoundException, 
  UserAlreadyExistException, 
  SignupException, 
  CredentialDeleteException 
} from '../security.exception';
import { SignInPayload, SignupPayload, RefreshTokenPayload } from '../model/payload';
import { Builder } from 'builder-pattern';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(Credential) private readonly repository: Repository<Credential>,
    private readonly tokenService: TokenService
  ) {}

  async detail(id: string): Promise<Credential> {
    const result = await this. repository.findOneBy({ credential_id: id });
    if (!isNil(result)) {
      return result;
    }
    throw new UserNotFoundException();
  }

  async signIn(payload: SignInPayload, isAdmin: boolean): Promise<Token | null> {
    let result = null;
    
    if (payload.socialLogin) {
      if (!isNil(payload.facebookHash) && payload.facebookHash.length > 0) {
        result = await this. repository.findOneBy({ facebookHash: payload.facebookHash, isAdmin });
      } else if (!isNil(payload.googleHash) && payload.googleHash.length > 0) {
        result = await this. repository.findOneBy({ googleHash: payload.googleHash, isAdmin });
      }
    } else {
      result = await this.repository.findOneBy({ username: payload.username, isAdmin });
    }
    
    if (!isNil(result) && (payload.socialLogin || await comparePassword(payload.password, result.password))) {
      return this.tokenService.getTokens(result);
    }
    throw new UserNotFoundException();
  }

  async signup(payload: SignupPayload): Promise<Token | null> {
    const result = await this.repository.findOneBy({ username: payload.username });
    if (!isNil(result)) {
      throw new UserAlreadyExistException();
    }
    try {
      const encryptedPassword = (payload.facebookHash?.length === 0 && payload.googleHash?.length === 0) 
        ? await encryptPassword(payload.password) 
        : '';
      
      const credential = await this. repository.save(
        Builder<Credential>()
          .username(payload.username)
          .password(encryptedPassword)
          .facebookHash(payload.facebookHash || '')
          .googleHash(payload.googleHash || '')
          .mail(payload.mail)
          .build()
      );
      return this.tokenService.getTokens(credential);
    } catch (e) {
      throw new SignupException();
    }
  }

  async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
    return this.tokenService.refresh(payload);
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.tokenService.deleteFor(detail);
      await this. repository.remove(detail);
    } catch (e) {
      throw new CredentialDeleteException();
    }
  }
}