import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';

import { Specie } from './species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesExistsPipe } from './species.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { File } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';
import { FilesInjectionToken } from '../../files/injection.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specie, File]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
  ],
  providers: [
    SpeciesService,
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: FilesInjectionToken.IMAGES_REPOSITORY,
    },
    {
      useClass: FilesService,
      provide: FilesInjectionToken.FILES_ACTIONS,
    },
    SpeciesExistsPipe,
  ],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
