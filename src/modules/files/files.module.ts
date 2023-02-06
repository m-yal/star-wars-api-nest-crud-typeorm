import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { FilesService } from './files.service';
import { ConfigModule } from '@nestjs/config';
import { FILES_REPOSITORY_TYPES_MAP } from './config/constants';
import { Files } from './file.entity';
import { People } from '../crud/people/people.entity';
import { Starships } from '../crud/starships/starships.entity';
import { Films } from '../crud/films/films.entity';
import { Planets } from '../crud/planets/planets.entity';
import { Species } from '../crud/species/species.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People, Films, Planets,
      Species, Starships, Vehicles,
      Files,
    ]),
    // MulterModule.register(),
    ConfigModule,
  ],
  providers: [
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
  ],
  exports: [
    FilesService,
  ]
})
export class FilesModule { }