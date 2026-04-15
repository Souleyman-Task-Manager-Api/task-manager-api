import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SecurityController } from './security.controller';
import { SecurityService } from './service/security.service';
import { TokenService } from './jwt/token.service';
import { Credential, Token } from './model/entity';
import { configManager } from '@common/config/config.manager';
import { ConfigKey } from '@common/config/enum';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
      signOptions: { expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN) as any },
    }),
    TypeOrmModule.forFeature([Credential, Token])
  ],
  controllers: [SecurityController],
  providers: [SecurityService, TokenService],
  exports: [SecurityService]
})
export class SecurityModule {}