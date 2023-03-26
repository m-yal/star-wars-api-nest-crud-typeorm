import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { Planets } from './planets.entity';
import { Vehicles } from '../vehicles/vehicles.entity';
import { PlanetExistsPipe } from './planets.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/entities/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planets, Vehicles, Files]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
    ConfigModule,
  ],
  controllers: [PlanetsController],
  providers: [
    PlanetsService, 
    PlanetExistsPipe, 
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
  ],
  exports: [PlanetsService],
})
export class PlanetsModule {}