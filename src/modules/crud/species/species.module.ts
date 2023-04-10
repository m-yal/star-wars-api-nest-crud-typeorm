import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';

import { Species } from '../species/species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesExistsPipe } from './species.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/entities/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Species, Files]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
    ConfigModule,
  ],
  providers: [
    SpeciesService,
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
    SpeciesExistsPipe,
  ],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
