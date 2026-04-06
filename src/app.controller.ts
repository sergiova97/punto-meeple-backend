import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): object {
    //return this.appService.getHello();
    return {
      database: {
        host: this.configService.get<string>('DB_HOST'),
        name: this.configService.get<string>('DB_NAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        port: this.configService.get<string>('DB_PORT'),
      },
    };
  }
}
