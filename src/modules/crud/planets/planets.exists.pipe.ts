import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Planets } from './planets.entity';

import { PlanetsService } from './planets.service';

@Injectable()
export class PlanetExistsPipe implements PipeTransform {
  constructor(private readonly planetsService: PlanetsService) {}

  async transform(planet: Planets) {
    const planetName = typeof planet === "string" ? planet : planet.name;
    const exists = await this.planetsService.exists(planetName);
    if (exists) return planet;
    throw new NotFoundException(`Planet with name: ${planetName} not found`);
  }
}