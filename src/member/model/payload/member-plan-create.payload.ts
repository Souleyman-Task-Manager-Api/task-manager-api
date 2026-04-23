import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsNotEmpty, Length, IsString, IsNumber, IsBoolean } from 'class-validator';
import { MemberPlanType, MemberPlanPaymentType, MemberPlanFreqTrainingType } from '../enum';

export class MemberPlanCreatePayload {
  @ApiProperty({ enum: MemberPlanType, required: false })
  @IsOptional()
  @IsEnum(MemberPlanType)
  type?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 80)
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(1, 40)
  picture?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nb_month: number;

  @ApiProperty({ enum: MemberPlanPaymentType, required: false })
  @IsOptional()
  @IsEnum(MemberPlanPaymentType)
  payment?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  cumulative?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  nb_training?: number;

  @ApiProperty({ enum: MemberPlanFreqTrainingType, required: false })
  @IsOptional()
  @IsEnum(MemberPlanFreqTrainingType)
  freq_training?: string;
}