import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus, TaskPriority } from '../models/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../models/dto';

@Injectable()
export class TasksService {
  private tasks: Map<string, Task> = new Map();
  private currentId: number = 1;

  constructor() {
    this.initializeDemoTasks();
  }

  private initializeDemoTasks(): void {
    const demoTasks: CreateTaskDto[] = [
      {
        title: 'Apprendre TypeScript',
        description: 'Terminer le cours sur les bases de TypeScript',
        priority: TaskPriority.HIGH,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        tags: ['formation', 'programmation']
      },
      {
        title: 'Faire les courses',
        description: 'Acheter des fruits, légumes et produits laitiers',
        priority: TaskPriority.MEDIUM,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        tags: ['personnel', 'courses']
      },
      {
        title: 'Rendez-vous médecin',
        description: 'Consultation annuelle de contrôle',
        priority: TaskPriority.URGENT,
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        tags: ['santé', 'important']
      }
    ];

    demoTasks.forEach(task => this.create(task));
  }

  private generateId(): string {
    return `TASK-${Date.now()}-${this.currentId++}`;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const now = new Date();
    const newTask: Task = {
      id: this.generateId(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
      priority: createTaskDto.priority || TaskPriority.MEDIUM,
      createdAt: now,
      updatedAt: now,
      dueDate: createTaskDto.dueDate,
      tags: createTaskDto.tags || []
    };

    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  findOne(id: string): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    const updatedTask: Task = {
      ...task,
      title: updateTaskDto.title ?? task.title,
      description: updateTaskDto.description ?? task.description,
      status: updateTaskDto.status ?? task.status,
      priority: updateTaskDto.priority ?? task.priority,
      dueDate: updateTaskDto.dueDate ?? task.dueDate,
      tags: updateTaskDto.tags ?? task.tags,
      updatedAt: new Date()
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  remove(id: string): void {
    this.findOne(id);
    this.tasks.delete(id);
  }

  findByPriority(priority: TaskPriority): Task[] {
    return this.findAll().filter(task => task.priority === priority);
  }

  findByStatus(status: TaskStatus): Task[] {
    return this.findAll().filter(task => task.status === status);
  }

  getOverdueTasks(): Task[] {
    const now = new Date();
    return this.findAll().filter(task =>
      task.dueDate &&
      task.dueDate < now &&
      task.status !== TaskStatus.COMPLETED &&
      task.status !== TaskStatus.CANCELLED
    );
  }

  completeTask(id: string): Task {
    return this.update(id, { status: TaskStatus.COMPLETED });
  }

  getStats() {
    const tasks = this.findAll();
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === TaskStatus.PENDING).length,
      inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
      cancelled: tasks.filter(t => t.status === TaskStatus.CANCELLED).length
    };
  }
}