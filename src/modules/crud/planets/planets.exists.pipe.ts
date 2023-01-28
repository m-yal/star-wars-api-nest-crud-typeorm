import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { PlanetsService } from './planets.service';

@Injectable()
export class PlanetExistsPipe implements PipeTransform {
  constructor(private readonly planetsService: PlanetsService) {}

  async transform(name: string) {
    const exists = await this.planetsService.exists(name);
    if (!exists) {
      throw new NotFoundException(`Planet with name: ${name} not found`);
    }
    return name;
  }
}
