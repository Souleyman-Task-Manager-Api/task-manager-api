import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { SecurityModule } from './security/security.module';
import { AppController } from './app.controller';
import { TaskEntity } from './tasks/entities/task.entity';
import { Credential, Token } from './security/model/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'task-manager.db',
      entities: [TaskEntity, Credential, Token],
      synchronize: true,
    }),
    TasksModule,
    SecurityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}