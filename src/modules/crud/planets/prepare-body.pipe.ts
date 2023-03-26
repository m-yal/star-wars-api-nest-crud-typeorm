import { PipeTransform, Injectable, ArgumentMetadata, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FilesService } from '../../files/files.service';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { Planets } from './planets.entity';

@Injectable()
export class PreparePlanetBodyPipe implements PipeTransform {
    
    constructor(
        private readonly peopleService: PeopleService,
        private readonly filmsService: FilmsService,
        @Inject("IFilesActions") private readonly filesService: FilesService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [residents, films, images] = await Promise.all([
            this.peopleService.findByNames(value.residents || []),
            this.filmsService.findByNames(value.films || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(Planets, {
            ...value,
            residents,
            films,
            images,
        });
    }
}