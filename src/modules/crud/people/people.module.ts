import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { People } from './people.entity';
import { PeopleService } from './people.service';
import { forwardRef } from '@nestjs/common'; 
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { StarshipsModule } from '../starships/starships.module';
import { SpeciesModule } from '../species/species.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([People]),
    forwardRef(() => FilesModule),
    forwardRef(() => FilmsModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => SpeciesModule),
    forwardRef(() => VehiclesModule),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService],
})
export class PeopleModule {}