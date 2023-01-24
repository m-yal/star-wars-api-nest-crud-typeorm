import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { SpeciesService } from './species.service';

@Injectable()
export class SpeciesExistsPipe implements PipeTransform {
  constructor(private readonly speciesService: SpeciesService) {}

  async transform(id: number) {
    const exists = await this.speciesService.exists(id);
    if (!exists) {
      throw new NotFoundException(`Specie with id: ${id} not found`);
    }
    return id;
  }
}
