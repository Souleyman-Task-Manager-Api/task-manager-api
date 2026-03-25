import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDate, IsArray } from 'class-validator';
import { TaskPriority } from '../task.model';

export class CreateTaskDto {
  @ApiProperty({ example: 'Apprendre TypeScript', description: 'Titre de la tâche' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Terminer le cours sur les bases de TypeScript', description: 'Description de la tâche' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.HIGH, description: 'Priorité de la tâche' })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({ example: '2025-04-01T00:00:00.000Z', description: 'Date d\'échéance', required: false })
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({ example: ['formation', 'typescript'], description: 'Tags', required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];
}