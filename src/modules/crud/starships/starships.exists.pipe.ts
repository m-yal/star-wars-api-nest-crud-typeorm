import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { StarshipsService } from './startships.service';

@Injectable()
export class StarshipExistsPipe implements PipeTransform {
  constructor(private readonly starshipsService: StarshipsService) {}

  async transform(name: string) {
    const exists = await this.starshipsService.exists(name);
    if (!exists) {
      throw new NotFoundException(`Starship with name: ${name} not found`);
    }
    return name;
  }
}
