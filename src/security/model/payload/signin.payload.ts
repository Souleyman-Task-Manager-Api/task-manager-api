import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class SignInPayload {
  @ApiProperty({ example: 'Youssouf' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  googleHash?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  facebookHash?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  socialLogin: boolean;
}