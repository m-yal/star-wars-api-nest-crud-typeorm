import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/modules/files/files.module';
import { FilmsModule } from '../films/films.module';
import { PeopleModule } from '../people/people.module';
import { Vehicles } from '../vehicles/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { forwardRef } from '@nestjs/common';
@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicles]),
    forwardRef(() => FilmsModule),
    forwardRef(() => FilesModule),
    forwardRef(() => PeopleModule),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
