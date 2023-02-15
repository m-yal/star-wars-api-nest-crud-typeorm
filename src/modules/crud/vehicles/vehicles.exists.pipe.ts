import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Vehicles } from './vehicles.entity';

import { VehiclesService } from './vehicles.service';

@Injectable()
export class VehicleExistsPipe implements PipeTransform {
  constructor(private readonly vehiclesService: VehiclesService) {}

  async transform(vehicle: Vehicles) {
    const exists = await this.vehiclesService.exists(vehicle.name);
    if (exists) return vehicle;
    throw new NotFoundException(`Vehicle with vehicle: ${vehicle.name} not found`);
  }
}