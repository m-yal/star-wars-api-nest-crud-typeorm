import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { PlanetsService } from '../planets/planets.service';
import { Species } from './species.entity';

@Injectable()
export class PrepareSpeicesBodyPipe implements PipeTransform {
    
    constructor(
        private readonly planetsService: PlanetsService,
        private readonly peopleService: PeopleService,
        private readonly filmsService: FilmsService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [homeworld, people, films] = await Promise.all([
            this.planetsService.findByNames([value.homeworldId] || []),
            this.peopleService.findByNames(value.people || []),
            this.filmsService.findByNames(value.films || []),
        ]);
        return plainToInstance(Species, {
            ...value,
            homeworld,
            people,
            films,
        });
    }
}