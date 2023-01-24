import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/modules/files/files.module';
import { PeopleModule } from '../people/people.module';
import { PlanetsModule } from '../planets/planets.module';
import { SpeciesModule } from '../species/species.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { FilmsController } from './films.controller';
import { Films } from './films.entity';
import { FilmsService } from './films.service';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Films]),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
    forwardRef(() => PlanetsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => VehiclesModule),
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}