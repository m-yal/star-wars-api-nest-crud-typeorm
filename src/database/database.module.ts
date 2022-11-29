import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedingService } from './seeding.service';
import { typeOrmAsyncConfig } from '../config/typeorm.config';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({isGlobal: true, envFilePath: ".env"}),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig)
    ],
    providers: [SeedingService]
  })
export class DatabaseModule {}  