import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDefaultWeather(): string {
    return 'Default weather';
  }
}
