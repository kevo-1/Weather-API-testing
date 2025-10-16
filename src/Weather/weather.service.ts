import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class WeatherService {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {
        this.baseUrl = this.config.get<string>('API_URL') ?? '';
        this.apiKey = this.config.get<string>('API_KEY') ?? '';
    }

    async getWeather(city: string) {
        const url = `${this.baseUrl}/current.json`;

        try {
            const cached = await this.cacheManager.get(city);
            if(cached) {
                console.log(cached)
                return cached;
            }
            const response = await lastValueFrom(
                this.http.get(url, {
                params: { 
                    key: this.apiKey,
                    q: city,
                    alerts: 'yes'
                },
                }),
            );
            await this.cacheManager.set(city, response.data, 600000);
            return response.data;
        } catch (error) {
            console.error('Weather API error:', error.response?.data || error.message);
            throw new Error('Failed to fetch weather data');
        }
    }
}
