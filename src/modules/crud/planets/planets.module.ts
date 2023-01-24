import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { forwardRef } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { Planets } from './planets.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Planets]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
  ],
  providers: [PlanetsService],
  controllers: [PlanetsController],
  exports: [PlanetsService],
})
export class PlanetsModule {}