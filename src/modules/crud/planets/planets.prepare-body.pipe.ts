import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { Planets } from './planets.entity';

@Injectable()
export class PreparePlanetBodyPipe implements PipeTransform {
    
    constructor(
        private readonly peopleService: PeopleService,
        private readonly filmsService: FilmsService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [residents, films] = await Promise.all([
            this.peopleService.findByIds(value.residents || []),
            this.filmsService.findByIds(value.films || []),
        ]);
        return plainToInstance(Planets, {
            ...value,
            residents,
            films,
        });
    }
}