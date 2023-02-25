import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, Validator } from 'class-validator';
import { FilesService } from '../../files/files.service';
import { FilmsService } from '../films/films.service';
import { SpeciesService } from '../species/species.service';
import { StarshipsService } from '../starships/startships.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { CreatePeopleDto } from './create.dto';
import { People } from './people.entity';

@Injectable()
export class PreparePeopleBodyPipe implements PipeTransform {
    
    constructor(
        private readonly filmsService: FilmsService,
        private readonly speciesService: SpeciesService,
        private readonly starshipsService: StarshipsService,
        private readonly vehiclesService: VehiclesService,
        @Inject("IFilesActions") private readonly filesService: FilesService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [films, species, starships, vehicles, images] = await Promise.all([
            this.filmsService.findByNames(value.films || []),
            this.speciesService.findByNames(value.species || []),
            this.starshipsService.findByNames(value.starships || []),
            this.vehiclesService.findByNames(value.vehicles || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(People, {
            ...value,
            films,
            species,
            starships,
            vehicles,
            images,
        });
    }
}