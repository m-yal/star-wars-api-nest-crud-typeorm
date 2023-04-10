import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FilesService } from './files.service';
import { FILES_REPOSITORY_TYPES_MAP } from './config/constants';
import { File } from './file.entity';
import { Person } from '../units/people/people.entity';
import { Starship } from '../units/starships/starships.entity';
import { Film } from '../units/films/films.entity';
import { Planet } from '../units/planets/planets.entity';
import { Specie } from '../units/species/species.entity';
import { FilesController } from './files.controller';
import { Vehicle } from '../units/vehicles/vehicles.entity';
import { FileNamesTransformer } from './files.names.transformer';
import { FilesInjectionToken } from './injection.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person, Film, Planet,
      Specie, Starship, Vehicle,
      File,
    ]),
    MulterModule.register(),
    ConfigModule,
  ],
  controllers: [FilesController],
  providers: [
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[new ConfigService().get(`FILES_STORAGE_TYPE`)],
      provide: FilesInjectionToken.IMAGES_REPOSITORY,
    },
    {
      useClass: FilesService,
      provide: FilesInjectionToken.FILES_ACTIONS,
    },
  ],
  exports: [
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[new ConfigService().get(`FILES_STORAGE_TYPE`)],
      provide: FilesInjectionToken.IMAGES_REPOSITORY,
    },
    {
      useClass: FilesService,
      provide: FilesInjectionToken.FILES_ACTIONS,
    },
  ],
})
export class FilesModule { }