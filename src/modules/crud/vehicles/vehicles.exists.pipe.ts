import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Vehicles } from './vehicles.entity';

import { VehiclesService } from './vehicles.service';

@Injectable()
export class VehicleExistsPipe implements PipeTransform {
  constructor(private readonly vehiclesService: VehiclesService) {}

  async transform(vehicle: Vehicles) {
    const vehicleName = typeof vehicle === "string" ? vehicle : vehicle.name;
    const exists = await this.vehiclesService.exists(vehicleName);
    if (exists) return vehicle;
    throw new NotFoundException(`Vehicle with vehicle: ${vehicleName} not found`);
  }
}