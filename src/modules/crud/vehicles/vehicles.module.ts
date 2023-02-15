import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { Vehicles } from '../vehicles/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { forwardRef } from '@nestjs/common';
import { VehicleExistsPipe } from './vehicles.exists.pipe';
import { FilesService } from 'src/modules/files/files.service';
import { FILES_REPOSITORY_TYPES_MAP } from 'src/modules/files/config/constants';
import { Files } from 'src/modules/files/file.entity';
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
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
  ],
  exports: [VehiclesService],
})
export class VehiclesModule {}