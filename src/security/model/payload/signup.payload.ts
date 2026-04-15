import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length, IsOptional } from 'class-validator';

export class SignupPayload {
  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsNotEmpty()
  @Length(6, 50)
  password: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({ required: false })
  @IsOptional()
  googleHash?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  facebookHash?: string;
}