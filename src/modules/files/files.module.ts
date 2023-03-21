import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FILES_REPOSITORY_TYPES_MAP } from './config/constants';
import { Files } from './file.entity';
import { People } from '../crud/people/people.entity';
import { Starships } from '../crud/starships/starships.entity';
import { Films } from '../crud/films/films.entity';
import { Planets } from '../crud/planets/planets.entity';
import { Species } from '../crud/species/species.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files.controller';
import { Vehicles } from '../crud/vehicles/vehicles.entity';
import { FileNamesTransformer } from './files.names.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People, Films, Planets,
      Species, Starships, Vehicles,
      Files,
    ]),
    MulterModule.register(),
    ConfigModule,
  ],
  controllers: [FilesController],
  providers: [
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[new ConfigService().get(`FILES_STORAGE_TYPE`)],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
  ],
  exports: [
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[new ConfigService().get(`FILES_STORAGE_TYPE`)],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
  ],
})
export class FilesModule { }