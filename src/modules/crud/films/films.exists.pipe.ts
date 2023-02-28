import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Films } from './films.entity';

import { FilmsService } from './films.service';

@Injectable()
export class FilmExistsPipe implements PipeTransform {
  constructor(private readonly filmsService: FilmsService) {}

  async transform(film: any) {
    const exists: boolean = await this.filmsService.exists(film.name);
    if (exists) return film;
    throw new NotFoundException(`Film with name: "${film.name}" not found`);
  }
}