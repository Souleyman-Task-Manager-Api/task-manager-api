import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Post('signup-test')
  async testSignup(@Body() body: any) {
    return {
      success: true,
      message: 'Endpoint fonctionne',
      received: body
    };
  }

  @Get()
  getHello(): string {
    return 'Task Manager API is running!';
  }
}