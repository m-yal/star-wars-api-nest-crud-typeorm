import { PipeTransform, Injectable, ArgumentMetadata, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FilesService } from '../../files/files.service';
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
        @Inject("IFilesActions") private readonly filesService: FilesService,
        ) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const [homeworld, people, films, images] = await Promise.all([
            this.planetsService.findByNames(this.prepareHomeworldValue(value.homeworld))[0],
            this.peopleService.findByNames(value.people || []),
            this.filmsService.findByNames(value.films || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(Species, {
            ...value,
            homeworld,
            people,
            films,
            images,
        });
    }
    
    private prepareHomeworldValue(homeworld: string) {
        if (!homeworld) return [];
        return [homeworld];
    }
}