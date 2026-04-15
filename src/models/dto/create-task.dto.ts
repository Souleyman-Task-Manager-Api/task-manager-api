import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDate, IsArray } from 'class-validator';
import { TaskPriority } from '../task.model';

export class CreateTaskDto {
  @ApiProperty({ example: 'Apprendre TypeScript' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Terminer le cours' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.HIGH })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({ example: '2025-04-01T00:00:00.000Z', required: false })
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({ example: ['formation', 'typescript'], required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];
}