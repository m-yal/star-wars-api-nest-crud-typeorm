import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { FilesModule } from './files/files.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: ".env"}),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    HttpModule,
    FilesModule,
    CrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}