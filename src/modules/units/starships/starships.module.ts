import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Starship } from './starships.entity';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './startships.service';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { StarshipExistsPipe } from './starships.exists.pipe';
import { FILES_REPOSITORY_TYPES_MAP } from '../../files/config/constants';
import { File } from '../../files/file.entity';
import { FilesModule } from '../../files/files.module';
import { FilesService } from '../../files/files.service';
import { FileNamesTransformer } from '../../files/files.names.transformer';
import { FilesInjectionToken } from '../../files/injection.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship, File]),
    forwardRef(() => PeopleModule),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
  ],
  providers: [
    StarshipsService,
    FileNamesTransformer,
    {
      useClass: FILES_REPOSITORY_TYPES_MAP[process.env.FILES_STORAGE_TYPE],
      provide: FilesInjectionToken.IMAGES_REPOSITORY,
    },
    {
      useClass: FilesService,
      provide: FilesInjectionToken.FILES_ACTIONS,
    }, 
    StarshipExistsPipe,
  ],
  controllers: [StarshipsController],
  exports: [StarshipsService],
})
export class StarshipsModule {}