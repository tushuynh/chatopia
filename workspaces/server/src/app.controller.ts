import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  app() {
    return 'Welcome to chatopia server';
  }
}
