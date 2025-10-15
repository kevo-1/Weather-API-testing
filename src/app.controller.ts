import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('weather')
export class WeatherController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDefaultWeather(@Res() res: Response): void {
    const msg = this.appService.getDefaultWeather();

    res.status(HttpStatus.OK).json({
      msg,
    });
  }
}
