import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './config/entities/people.entity';
import { Films } from './config/entities/films.entity';
import { Planets } from './config/entities/planets.entity';
import { Species } from './config/entities/species.entity';
import { Starships } from './config/entities/starships.entity';
import { Vehicles } from './config/entities/vehicles.entity';
import { MySQLUnitsRepository } from './crud-mysql.repository';
import { FSFilesRepository } from '../files/files.fs.repository';
import { AwsS3FilesRepository } from '../files/files.aws-s3.repository';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People, Films, Planets, 
      Species, Starships, Vehicles
    ]),
  ],
  providers: [CrudService, MySQLUnitsRepository],
  controllers: [CrudController]
})
export class CrudModule {}