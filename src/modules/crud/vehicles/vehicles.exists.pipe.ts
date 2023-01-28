import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { VehiclesService } from './vehicles.service';

@Injectable()
export class VehicleExistsPipe implements PipeTransform {
  constructor(private readonly vehiclesService: VehiclesService) {}

  async transform(name: string) {
    const exists = await this.vehiclesService.exists(name);
    if (!exists) {
      throw new NotFoundException(`Vehicle with name: ${name} not found`);
    }
    return name;
  }
}
