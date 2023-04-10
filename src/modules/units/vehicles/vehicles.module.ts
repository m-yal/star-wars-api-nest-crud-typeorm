import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { Vehicle } from './vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { VehicleExistsPipe } from './vehicles.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { File } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';
import { FilesInjectionToken } from '../../files/injection.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, File]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    ConfigModule,
  ],
  controllers: [VehiclesController],
  providers: [
    VehiclesService, 
    VehicleExistsPipe,
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
  exports: [VehiclesService],
})
export class VehiclesModule {}