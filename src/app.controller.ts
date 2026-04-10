import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Hello')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Afficher Hello World' })
  getHello(): string {
    return 'Hello World! 🚀';
  }

  @Get('hello')
  @ApiOperation({ summary: 'Afficher un message de bienvenue' })
  getHelloMessage(): string {
    return 'Bienvenue sur mon API Task Manager !';
  }
}