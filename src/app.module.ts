import { Module } from '@nestjs/common';
import { AppController, WeatherController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, WeatherController],
  providers: [AppService],
})
export class AppModule {}
