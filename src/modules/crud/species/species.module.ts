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

@Module({
  imports: [
    TypeOrmModule.forFeature([Species]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
  ],
  providers: [SpeciesService],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
