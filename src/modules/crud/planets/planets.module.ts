import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { forwardRef } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { Planets } from './planets.entity';
import { VehicleExistsPipe } from '../vehicles/vehicles.exists.pipe';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Vehicles } from '../vehicles/vehicles.entity';
import { PlanetExistsPipe } from './planets.exists.pipe';
import { Files } from 'src/modules/files/file.entity';
import { FilesService } from 'src/modules/files/files.service';
import { FILES_REPOSITORY_TYPES_MAP } from 'src/modules/files/config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planets, Vehicles, Files]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
  ],
  controllers: [PlanetsController],
  providers: [
    PlanetsService, 
    PlanetExistsPipe, 
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },  
  ],
  exports: [PlanetsService],
})
export class PlanetsModule {}