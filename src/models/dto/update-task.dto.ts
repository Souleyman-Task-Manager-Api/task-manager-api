import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ enum: TaskStatus, example: TaskStatus.COMPLETED, description: 'Statut de la tâche', required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}