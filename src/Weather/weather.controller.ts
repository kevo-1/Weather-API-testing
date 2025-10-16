import { Controller, Get, HttpStatus, Param, Res} from '@nestjs/common';
import type { Response } from 'express';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService){}

    @Get(':Country/:City')
    async getWeather(
        @Res() res: Response,
        @Param('Country') country: string,
        @Param('City') city: string,
    ): Promise<void> {
        console.log('Fetching weather for:', city);
        const data = await this.weatherService.getWeather(city);
        res.status(HttpStatus.OK).json({
            data: data
        });
    }
}