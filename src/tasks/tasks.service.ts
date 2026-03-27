import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../models/dto';
import { TaskStatus, TaskPriority } from '../models/task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const newTask = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      priority: createTaskDto.priority || TaskPriority.MEDIUM,
      dueDate: createTaskDto.dueDate,
      tags: createTaskDto.tags || [],
    });
    return this.taskRepository.save(newTask);
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async findByPriority(priority: TaskPriority): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: { priority } });
  }

  async findByStatus(status: TaskStatus): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: { status } });
  }

  async getOverdueTasks(): Promise<TaskEntity[]> {
    const now = new Date();
    const tasks = await this.taskRepository.find();
    return tasks.filter(task =>
      task.dueDate &&
      new Date(task.dueDate) < now &&
      task.status !== TaskStatus.COMPLETED &&
      task.status !== TaskStatus.CANCELLED
    );
  }

  async completeTask(id: string): Promise<TaskEntity> {
    return this.update(id, { status: TaskStatus.COMPLETED });
  }

  async getStats() {
    const tasks = await this.findAll();
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === TaskStatus.PENDING).length,
      inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
      cancelled: tasks.filter(t => t.status === TaskStatus.CANCELLED).length,
    };
  }
}