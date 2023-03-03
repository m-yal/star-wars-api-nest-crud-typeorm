import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from '../starships/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './startships.service';
import { forwardRef } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { StarshipExistsPipe } from './starships.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { Repository } from 'typeorm';
import { FileNamesTransformer } from '../../files/files.names.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starships, Files]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
  ],
  providers: [
    StarshipsService,
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    }, 
    {
      useClass: Repository<Files>,
      provide: "FilesRecordsRepository",
    },
    StarshipExistsPipe,
  ],
  controllers: [StarshipsController],
  exports: [StarshipsService],
})
export class StarshipsModule {}