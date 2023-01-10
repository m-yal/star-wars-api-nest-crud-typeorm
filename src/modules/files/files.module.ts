import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/modules/crud/config/entities/films.entity';
import { People } from 'src/modules/crud/config/entities/people.entity';
import { Planets } from 'src/modules/crud/config/entities/planets.entity';
import { Species } from 'src/modules/crud/config/entities/species.entity';
import { Starships } from 'src/modules/crud/config/entities/starships.entity';
import { Vehicles } from 'src/modules/crud/config/entities/vehicles.entity';
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from './config/entities/image.entity';
import { FSFilesRepository } from './files.fs.repository';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { AwsS3FilesRepository } from './files.aws-s3.repository';
import { ConfigModule } from '@nestjs/config';
import { FilesRepositoryType } from 'src/common/types/types';
import { filesRepositoryTypesMap } from './config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People, Films, Planets, Species, 
      Starships, Vehicles, PeopleImage, 
      FilmsImage, PlanetsImage, SpeciesImage, 
      StarshipsImage, VehiclesImage
    ]), 
    MulterModule.register(),
    ConfigModule,
  ],
  controllers: [FilesController],
  providers: [
    FSFilesRepository, 
    {
      useClass: filesRepositoryTypesMap[process.env.FILES_STORAGE_TYPE], 
      provide: "SwapiImagesRepository"
    }, 
    FilesService
  ],
  exports: [
    FilesService
  ]
})
export class FilesModule {}