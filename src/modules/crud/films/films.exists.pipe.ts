import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { FilmsService } from './films.service';

@Injectable()
export class FilmExistsPipe implements PipeTransform {
  constructor(private readonly filmsService: FilmsService) {}

  async transform(id: number) {
    const exists = await this.filmsService.exists(id);
    if (!exists) {
      throw new NotFoundException(`Film with id: ${id} not found`);
    }
    return id;
  }
}
