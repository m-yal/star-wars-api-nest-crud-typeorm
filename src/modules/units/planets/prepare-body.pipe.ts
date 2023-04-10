import { PipeTransform, Injectable, ArgumentMetadata, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FilesService } from '../../files/files.service';
import { FilesInjectionToken } from '../../files/injection.tokens';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { Planet } from './planets.entity';

@Injectable()
export class PreparePlanetBodyPipe implements PipeTransform {
    
    constructor(
        private readonly peopleService: PeopleService,
        private readonly filmsService: FilmsService,
        @Inject(FilesInjectionToken.FILES_ACTIONS) private readonly filesService: FilesService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [residents, films, images] = await Promise.all([
            this.peopleService.findByNames(value.residents || []),
            this.filmsService.findByNames(value.films || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(Planet, {
            ...value,
            residents,
            films,
            images,
        });
    }
}