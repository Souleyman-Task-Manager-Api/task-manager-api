import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { TaskEntity } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'task-manager.db',
      entities: [TaskEntity],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],  // ← Ajoutez cette ligne
  providers: [],
})
export class AppModule {}