import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Species } from './species.entity';

import { SpeciesService } from './species.service';

@Injectable()
export class SpeciesExistsPipe implements PipeTransform {
  constructor(private readonly speciesService: SpeciesService) {}

  async transform(specie: Species) {
    const specieName = typeof specie === "string" ? specie : specie.name;
    const exists = await this.speciesService.exists(specieName);
    if (exists) return specie;
    throw new NotFoundException(`Specie with name: ${specieName} not found`);
  }
}