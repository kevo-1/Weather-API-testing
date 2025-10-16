import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherService } from './Weather/weather.service';
import { WeatherController } from './Weather/weather.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        try {
          const store = await redisStore({
            socket: {
              host: 'localhost',
              port: 6379,
            },
          });
          
          console.log('Redis store connected successfully');
          
          return {
            store: () => store,
            ttl: 600 * 1000,
          };
        } catch (error) {
          console.error('Redis connection failed:', error.message);
          throw error;
        }
      },
    }),
  ],
  controllers: [AppController, WeatherController],
  providers: [AppService, WeatherService],
})
export class AppModule {}