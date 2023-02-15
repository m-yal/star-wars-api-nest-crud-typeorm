import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Planets } from './planets.entity';

import { PlanetsService } from './planets.service';

@Injectable()
export class PlanetExistsPipe implements PipeTransform {
  constructor(private readonly planetsService: PlanetsService) {}

  async transform(planet: Planets) {
    const exists = await this.planetsService.exists(planet.name);
    if (exists) return planet;
    throw new NotFoundException(`Planet with name: ${planet.name} not found`);
  }
}