import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/crud/entities/films.entity';
import { People } from 'src/crud/entities/people.entity';
import { Planets } from 'src/crud/entities/planets.entity';
import { Species } from 'src/crud/entities/species.entity';
import { Starships } from 'src/crud/entities/starships.entity';
import { Vehicles } from 'src/crud/entities/vehicles.entity';
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from './entities/image.entity';
import { MySQLFilesRepository } from './files-mysql.repository';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

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
  providers: [FilesService, MySQLFilesRepository]
})
export class FilesModule {}