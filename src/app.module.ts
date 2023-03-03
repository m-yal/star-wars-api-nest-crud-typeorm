import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './modules/files/files.module';
import { CrudModule } from './modules/crud/crud.module';
import { AuthModule } from './modules/auth/auth.module';
// import { DatabaseModule } from './modules/database/database.module';
import { typeOrmAsyncConfig } from './modules/database/config/swapi.typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: ".env"
      }
    ),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // DatabaseModule,
    FilesModule,
    CrudModule,
    AuthModule,
  ],
})
export class AppModule {}