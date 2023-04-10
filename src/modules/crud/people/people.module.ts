import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common'; 
import { Repository } from 'typeorm';

import { PeopleController } from './people.controller';
import { People } from './people.entity';
import { PeopleService } from './people.service';
import { FilmsModule } from '../films/films.module';
import { StarshipsModule } from '../starships/starships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { PeopleExistsPipe } from './people.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/entities/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([People, Files]),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => VehiclesModule),
    ConfigModule,
  ],
  controllers: [PeopleController],
  providers: [
    PeopleService, 
    PeopleExistsPipe,
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    },
  ],
  exports: [PeopleService],
})
export class PeopleModule {}