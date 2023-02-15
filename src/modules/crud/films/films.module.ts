import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/modules/files/files.module';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { FilmsController } from './films.controller';
import { Films } from './films.entity';
import { FilmsService } from './films.service';
import { forwardRef } from '@nestjs/common';
import { FilesService } from 'src/modules/files/files.service';
import { Files } from 'src/modules/files/file.entity';
import { FILES_REPOSITORY_TYPES_MAP } from 'src/modules/files/config/constants';
import { MulterModule } from '@nestjs/platform-express';
import { FilmExistsPipe } from './films.exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Films, Files]),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => VehiclesModule),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService, 
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
    FilmExistsPipe,
  ],
  exports: [FilmsService],
})
export class FilmsModule {}