import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { Vehicles } from '../vehicles/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { forwardRef } from '@nestjs/common';
import { VehicleExistsPipe } from './vehicles.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { Repository } from 'typeorm';
import { FileNamesTransformer } from '../../files/files.names.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicles, Files]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
  ],
  controllers: [VehiclesController],
  providers: [
    VehiclesService, 
    VehicleExistsPipe,
    FileNamesTransformer,
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
  ],
  exports: [VehiclesService],
})
export class VehiclesModule {}