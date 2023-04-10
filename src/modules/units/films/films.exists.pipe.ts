import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { FilmsService } from './films.service';

@Injectable()
export class FilmExistsPipe implements PipeTransform {
  constructor(private readonly filmsService: FilmsService) {}

  async transform(film: any) {
    const filmname = typeof film === "string" ? film : film.name;
    const exists: boolean = await this.filmsService.exists(filmname);
    if (exists) return film;
    throw new NotFoundException(`Film with name: "${filmname}" not found`);
  }
}