import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { StarshipsService } from './startships.service';

@Injectable()
export class StarshipExistsPipe implements PipeTransform {
  constructor(private readonly starshipsService: StarshipsService) {}

  async transform(id: number) {
    const exists = await this.starshipsService.exists(id);
    if (!exists) {
      throw new NotFoundException(`Starship with id: ${id} not found`);
    }
    return id;
  }
}
