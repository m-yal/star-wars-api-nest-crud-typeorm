import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { FilmsController } from './films.controller';
import { Film } from './films.entity';
import { FilmsService } from './films.service';
import { forwardRef } from '@nestjs/common';
import { FilmExistsPipe } from './films.exists.pipe';
import { CreatedUnitResponseInterceptor } from '../../../common/interceptors/created-unit-response.interceptor';
import { DeletedResponseInterceptor } from '../../../common/interceptors/deleted-unit-response.interceptor';
import { UpdatedUnitResponseInterceptor } from '../../../common/interceptors/update-unit-response.interceptor';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { File } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { PrepareFilmBodyPipe } from './prepare.film.body.pipe';
import { FileNamesTransformer } from '../../files/files.names.transformer';
import { FilesInjectionToken } from '../../files/injection.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, File]),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => VehiclesModule),
    ConfigModule,
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: FilesInjectionToken.IMAGES_REPOSITORY,
    },
    {
      useClass: FilesService,
      provide: FilesInjectionToken.FILES_ACTIONS,
    },
    FilmExistsPipe,
    PrepareFilmBodyPipe,
    CreatedUnitResponseInterceptor,
    UpdatedUnitResponseInterceptor,
    DeletedResponseInterceptor,
  ],
  exports: [FilmsService],
})
export class FilmsModule { }