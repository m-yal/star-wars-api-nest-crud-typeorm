import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { PlanetsService } from './planets.service';

@Injectable()
export class PlanetExistsPipe implements PipeTransform {
  constructor(private readonly planetsService: PlanetsService) {}

  async transform(id: number) {
    const exists = await this.planetsService.exists(id);
    if (!exists) {
      throw new NotFoundException(`Planet with id: ${id} not found`);
    }
    return id;
  }
}
