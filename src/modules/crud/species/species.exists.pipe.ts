import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { SpeciesService } from './species.service';

@Injectable()
export class SpeciesExistsPipe implements PipeTransform {
  constructor(private readonly speciesService: SpeciesService) {}

  async transform(name: string) {
    const exists = await this.speciesService.exists(name);
    if (!exists) {
      throw new NotFoundException(`Specie with name: ${name} not found`);
    }
    return name;
  }
}
