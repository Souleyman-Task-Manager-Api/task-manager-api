import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS plus permissif pour le développement
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API de gestion des tâches')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth() // Ajoute l'authentification JWT dans Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Port dynamique (variable d'environnement ou 4000 par défaut)
  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log(`✅ Application démarrée sur http://localhost:${port}`);
  console.log(`📚 Documentation Swagger: http://localhost:${port}/api-docs`);
}
bootstrap();