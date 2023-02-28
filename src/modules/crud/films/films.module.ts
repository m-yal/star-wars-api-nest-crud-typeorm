import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { FilmsController } from './films.controller';
import { Films } from './films.entity';
import { FilmsService } from './films.service';
import { forwardRef } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilmExistsPipe } from './films.exists.pipe';
import { CreatedUnitResponseInterceptor } from '../../../common/interceptors/created-unit-response.interceptor';
import { DeletedResponseInterceptor } from '../../../common/interceptors/deleted-unit-response.interceptor';
import { UpdatedUnitResponseInterceptor } from '../../../common/interceptors/update-unit-response.interceptor';
import { DataResponseInterceptor } from '../config/interceptors/data-response.interceptor';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { Repository } from 'typeorm';
import { PrepareFilmBodyPipe } from './prepare-film-body.pipe';

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
    {
      useClass: Repository<Files>,
      provide: "FilesRecordsRepository",
    },
    FilmExistsPipe,
    PrepareFilmBodyPipe,
    CreatedUnitResponseInterceptor,
    UpdatedUnitResponseInterceptor,
    DeletedResponseInterceptor,
  ],
  exports: [FilmsService],
})
export class FilmsModule {}