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

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(Credential) private readonly repository: Repository<Credential>,
    private readonly tokenService: TokenService
  ) {}

  async detail(id: string): Promise<Credential> {
    const result = await this.repository.findOneBy({ credential_id: id });
    if (!isNil(result)) {
      return result;
    }
    throw new UserNotFoundException();
  }

  async signIn(payload: SignInPayload, isAdmin: boolean): Promise<any> {
    let result: Credential | null = null;

    if (payload.socialLogin) {
      if (!isNil(payload.facebookHash) && payload.facebookHash && payload.facebookHash.length > 0) {
        result = await this.repository.findOneBy({ facebookHash: payload.facebookHash, isAdmin });
      } else if (!isNil(payload.googleHash) && payload.googleHash && payload.googleHash.length > 0) {
        result = await this.repository.findOneBy({ googleHash: payload.googleHash, isAdmin });
      }
    } else {
      result = await this.repository.findOneBy({ username: payload.username, isAdmin });
    }

    if (!isNil(result) && result && (payload.socialLogin || await comparePassword(payload.password, result.password))) {
      return {
        success: true,
        message: 'Connexion réussie',
        user: {
          id: result.credential_id,
          username: result.username,
          email: result.mail
        }
      };
    }
    throw new UserNotFoundException();
  }

  async signup(payload: SignupPayload): Promise<any> {
    const existingUser = await this.repository.findOne({
      where: [
        { username: payload.username },
        { mail: payload.mail }
      ]
    });
    
    if (existingUser) {
      throw new UserAlreadyExistException();
    }
    
    const hashedPassword = await encryptPassword(payload.password);
    
    const user = new Credential();
    user.username = payload.username;
    user.password = hashedPassword;
    user.mail = payload.mail;
    user.googleHash = payload.googleHash || null;
    user.facebookHash = payload.facebookHash || null;
    user.isAdmin = false;
    user.active = true;
    
    const savedUser = await this.repository.save(user);
    
    return {
      success: true,
      message: 'Inscription réussie',
      user: {
        id: savedUser.credential_id,
        username: savedUser.username,
        email: savedUser.mail
      }
    };
  }

  async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
    return this.tokenService.refresh(payload);
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);
      await this.tokenService.deleteFor(detail);
      await this.repository.remove(detail);
    } catch (e) {
      throw new CredentialDeleteException();
    }
  }
}