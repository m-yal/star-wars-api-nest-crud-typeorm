import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from '../starships/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './startships.service';
import { forwardRef } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starships]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
  ],
  providers: [StarshipsService],
  controllers: [StarshipsController],
  exports: [StarshipsService],
})
export class StarshipsModule {}