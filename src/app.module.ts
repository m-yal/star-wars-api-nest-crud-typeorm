import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from './modules/files/files.module';
import { UnitsModule } from './modules/units/units.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmAsyncConfig } from './common/db.configs/typeorm.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: [".env"],
      }
    ),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    FilesModule,
    UnitsModule,
    AuthModule,
  ],
  controllers: [AppController]
})
export class AppModule {}