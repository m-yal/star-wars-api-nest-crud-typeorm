import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from '../starships/starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './startships.service';
import { forwardRef } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { FilesService } from 'src/modules/files/files.service';
import { StarshipExistsPipe } from './starships.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from 'src/modules/files/config/constants';
import { Files } from 'src/modules/files/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starships, Files]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
  ],
  providers: [
    StarshipsService, 
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: "SwapiImagesRepository",
    },
    {
      useClass: FilesService,
      provide: "IFilesActions",
    }, 
    StarshipExistsPipe,
  ],
  controllers: [StarshipsController],
  exports: [StarshipsService],
})
export class StarshipsModule {}