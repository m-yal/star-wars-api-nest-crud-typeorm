import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { Films } from './entities/films.entity';
import { Planets } from './entities/planets.entity';
import { Species } from './entities/species.entity';
import { Starships } from './entities/starships.entity';
import { Vehicles } from './entities/vehicles.entity';
import { MySQLUnitsRepository } from './crud-mysql.repository';

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