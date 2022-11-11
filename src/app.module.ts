import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { PeopleModule } from './people/people.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    PeopleModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: ".env"}),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    HttpModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}