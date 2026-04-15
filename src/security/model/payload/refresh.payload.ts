import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenPayload {
  @ApiProperty({ description: "Refresh token" })
  @IsNotEmpty()
  refresh: string;
}