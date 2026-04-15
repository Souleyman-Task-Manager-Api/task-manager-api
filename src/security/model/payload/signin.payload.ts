import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class SignInPayload {
  @ApiProperty({ example: 'john_doe', description: "Nom d'utilisateur" })
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  username: string;

  @ApiProperty({ example: 'P@ssw0rd', description: "Mot de passe" })
  @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
  password: string;

  @ApiProperty({ required: false, description: "Hash Google (optionnel)" })
  @IsOptional()
  googleHash?: string;

  @ApiProperty({ required: false, description: "Hash Facebook (optionnel)" })
  @IsOptional()
  facebookHash?: string;

  @ApiProperty({ default: false, description: "Connexion via réseau social" })
  @IsBoolean()
  socialLogin: boolean;
}