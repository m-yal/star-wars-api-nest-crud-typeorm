import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { forwardRef } from '@nestjs/common';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { Planet } from './planets.entity';
import { Vehicle } from '../vehicles/vehicles.entity';
import { PlanetExistsPipe } from './planets.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { File } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';
import { FilesInjectionToken } from '../../files/injection.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet, Vehicle, File]),
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
      provide: FilesInjectionToken.IMAGES_REPOSITORY,
    },
    {
      useClass: FilesService,
      provide: FilesInjectionToken.FILES_ACTIONS,
    },
  ],
  exports: [PlanetsService],
})
export class PlanetsModule {}