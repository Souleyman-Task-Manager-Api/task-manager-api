import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Accueil')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Page d\'accueil de l\'API' })
  getHome() {
    return {
      message: 'Bienvenue sur l\'API Task Manager',
      version: '1.0',
      endpoints: {
        tasks: '/tasks',
        stats: '/tasks/stats',
        docs: '/api-docs',
        signin: '/account/signin',
        signup: '/account/signup'
      }
    };
  }

  @Get('hello')
  @ApiOperation({ summary: 'Message de bienvenue' })
  getHello() {
    return { message: 'Hello World! 🚀' };
  }
}