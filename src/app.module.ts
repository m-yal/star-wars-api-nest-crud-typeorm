import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './modules/files/files.module';
import { CrudModule } from './modules/crud/crud.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmAsyncConfig } from './common/db.configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: [".env"]
      }
    ),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    FilesModule,
    CrudModule,
    AuthModule,
  ],
  exports: [
    ConfigModule,
  ]
})
export class AppModule {}