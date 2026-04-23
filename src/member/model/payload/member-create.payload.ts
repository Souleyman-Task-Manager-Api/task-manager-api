import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsDate, IsEnum, IsEmail, IsArray, IsBoolean } from 'class-validator';
import { Gender } from '../enum';
import { Address } from '../entity';
import { MemberSubscription } from '../entity';

export class MemberCreatePayload {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  firstname?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  lastname?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthdate?: Date;

  @ApiProperty({ enum: Gender, required: false })
  @IsEnum(Gender)
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  mail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(1, 15)
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(1, 34)
  iban?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(1, 10)
  code_activation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  subscriptions?: MemberSubscription[];

  @ApiProperty({ required: false })
  @IsOptional()
  address?: Address;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}