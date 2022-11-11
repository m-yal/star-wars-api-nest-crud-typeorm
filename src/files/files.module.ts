import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([People]), MulterModule.register()],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
