import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/modules/crud/entities/films.entity';
import { People } from 'src/modules/crud/entities/people.entity';
import { Planets } from 'src/modules/crud/entities/planets.entity';
import { Species } from 'src/modules/crud/entities/species.entity';
import { Starships } from 'src/modules/crud/entities/starships.entity';
import { Vehicles } from 'src/modules/crud/entities/vehicles.entity';
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from './entities/image.entity';
import { MySQLFilesRepository } from './files.mysql.repository';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { AwsS3FilesRepository } from './files.aws-s3.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People, Films, Planets, Species, 
      Starships, Vehicles, PeopleImage, 
      FilmsImage, PlanetsImage, SpeciesImage, 
      StarshipsImage, VehiclesImage
    ]), 
    MulterModule.register()
  ],
  controllers: [FilesController],
  providers: [FilesService, MySQLFilesRepository, AwsS3FilesRepository]
})
export class FilesModule {}