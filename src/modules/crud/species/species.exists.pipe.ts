import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Species } from './species.entity';

import { SpeciesService } from './species.service';

@Injectable()
export class SpeciesExistsPipe implements PipeTransform {
  constructor(private readonly speciesService: SpeciesService) {}

  async transform(specie: Species) {
    const exists = await this.speciesService.exists(specie.name);
    if (exists) return specie;
    throw new NotFoundException(`Specie with name: ${specie.name} not found`);
  }
}