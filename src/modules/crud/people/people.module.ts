import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { People } from './people.entity';
import { PeopleService } from './people.service';
import { forwardRef } from '@nestjs/common'; 
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { StarshipsModule } from '../starships/starships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { FilesService } from 'src/modules/files/files.service';
import { Files } from 'src/modules/files/file.entity';
import { PeopleExistsPipe } from './people.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from 'src/modules/files/config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([People, Files]),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => VehiclesModule),
  ],
  controllers: [PeopleController],
  providers: [
    PeopleService, 
    PeopleExistsPipe,
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