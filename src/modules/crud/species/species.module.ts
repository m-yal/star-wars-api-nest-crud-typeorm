import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from '../species/species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { forwardRef } from '@nestjs/common';
import { FilmsModule } from '../films/films.module';
import { FilesModule } from 'src/modules/files/files.module';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { FilesService } from 'src/modules/files/files.service';
import { SpeciesExistsPipe } from './species.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from 'src/modules/files/config/constants';
import { Files } from 'src/modules/files/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Species, Files]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
  ],
  providers: [
    SpeciesService, 
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    }, 
    SpeciesExistsPipe,
  ],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
