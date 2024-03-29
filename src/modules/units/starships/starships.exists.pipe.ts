import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { Starship } from './starships.entity';
import { StarshipsService } from './startships.service';

@Injectable()
export class StarshipExistsPipe implements PipeTransform {
  constructor(private readonly starshipsService: StarshipsService) {}

  async transform(starship: Starship) {
    const starshipName = typeof starship === "string" ? starship : starship.name;
    const exists = await this.starshipsService.exists(starshipName);
    if (exists) return starship;
    throw new NotFoundException(`Starship with name: ${starshipName} not found`);
  }
}
