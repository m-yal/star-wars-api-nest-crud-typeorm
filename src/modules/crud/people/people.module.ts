import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { People } from './people.entity';
import { PeopleService } from './people.service';
import { forwardRef } from '@nestjs/common'; 
import { FilmsModule } from '../films/films.module';
import { StarshipsModule } from '../starships/starships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { PeopleExistsPipe } from './people.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { Files } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { Repository } from 'typeorm';
import { FileNamesTransformer } from '../../files/files.names.transformer';
import { ConfigModule } from '@nestjs/config';

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
    {
      useClass: Repository<Files>,
      provide: "FilesRecordsRepository",
    },
  ],
  exports: [PeopleService],
})
export class PeopleModule {}