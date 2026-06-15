import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SecurityController } from './security.controller';
import { SecurityService } from './service/security.service';
import { TokenService } from './jwt/token.service';
import { Credential, Token } from './model/entity';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credential, Token]),
    JwtModule.register({}),
  ],
  controllers: [SecurityController],
  providers: [SecurityService, TokenService, JwtGuard],
  exports: [SecurityService, TokenService, JwtGuard],
})
export class SecurityModule {}