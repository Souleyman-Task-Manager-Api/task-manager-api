import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../models/dto';
import { TaskPriority, TaskStatus } from '../models/task.model';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtenir les statistiques des tâches' })
  getStats() {
    return this.tasksService.getStats();
  }

  @Get('overdue')
  @ApiOperation({ summary: 'Récupérer les tâches en retard' })
  getOverdueTasks() {
    return this.tasksService.getOverdueTasks();
  }

  @Get('priority/:priority')
  @ApiOperation({ summary: 'Récupérer les tâches par priorité' })
  getTasksByPriority(@Param('priority') priority: TaskPriority) {
    return this.tasksService.findByPriority(priority);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Récupérer les tâches par statut' })
  getTasksByStatus(@Param('status') status: TaskStatus) {
    return this.tasksService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par son ID' })
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Marquer une tâche comme terminée' })
  completeTask(@Param('id') id: string) {
    return this.tasksService.completeTask(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une tâche' })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}