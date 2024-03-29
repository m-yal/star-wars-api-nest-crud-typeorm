import { PipeTransform, Injectable, ArgumentMetadata, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { FilesService } from '../../files/files.service';
import { FilesInjectionToken } from '../../files/injection.tokens';
import { FilmsService } from '../films/films.service';
import { SpeciesService } from '../species/species.service';
import { StarshipsService } from '../starships/startships.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Person } from './people.entity';

@Injectable()
export class PreparePeopleBodyPipe implements PipeTransform {
    
    constructor(
        private readonly filmsService: FilmsService,
        private readonly speciesService: SpeciesService,
        private readonly starshipsService: StarshipsService,
        private readonly vehiclesService: VehiclesService,
        @Inject(FilesInjectionToken.FILES_ACTIONS) private readonly filesService: FilesService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [films, species, starships, vehicles, images] = await Promise.all([
            this.filmsService.findByNames(value.films || []),
            this.speciesService.findByNames(value.species || []),
            this.starshipsService.findByNames(value.starships || []),
            this.vehiclesService.findByNames(value.vehicles || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(Person, {
            ...value,
            films,
            species,
            starships,
            vehicles,
            images,
        });
    }
}