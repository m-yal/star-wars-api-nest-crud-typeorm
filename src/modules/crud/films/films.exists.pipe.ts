import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { FilmsService } from './films.service';

@Injectable()
export class FilmExistsPipe implements PipeTransform {
  constructor(private readonly filmsService: FilmsService) {}

  async transform(name: string) {
    const exists = await this.filmsService.exists(name);
    if (!exists) {
      throw new NotFoundException(`Film with name: ${name} not found`);
    }
    return name;
  }
}
