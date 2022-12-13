import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { FilesModule } from './files/files.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: ".env"}),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    FilesModule,
    CrudModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}