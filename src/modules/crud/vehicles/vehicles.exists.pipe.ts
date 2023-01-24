import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { VehiclesService } from './vehicles.service';

@Injectable()
export class VehicleExistsPipe implements PipeTransform {
  constructor(private readonly vehiclesService: VehiclesService) {}

  async transform(id: number) {
    const exists = await this.vehiclesService.exists(id);
    if (!exists) {
      throw new NotFoundException(`Vehicle with id: ${id} not found`);
    }
    return id;
  }
}
