import { ArgumentMetadata, Inject, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { FilesService } from "../../files/files.service";
import { FilesInjectionToken } from "../../files/injection.tokens";
import { PeopleService } from "../people/people.service";
import { PlanetsService } from "../planets/planets.service";
import { SpeciesService } from "../species/species.service";
import { StarshipsService } from "../starships/startships.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { CreateFilmDto } from "./create.dto";
import { Film } from "./films.entity";

@Injectable()
export class PrepareFilmBodyPipe implements PipeTransform {

    constructor(
        private readonly peopleService: PeopleService,
        private readonly planetsService: PlanetsService,
        private readonly starshipsService: StarshipsService,
        private readonly speciesService: SpeciesService,
        private readonly vehiclesService: VehiclesService,
        @Inject(FilesInjectionToken.FILES_ACTIONS) private readonly filesService: FilesService, 
    ) {}

    async transform(value: CreateFilmDto, metadata?: ArgumentMetadata) {
        const [characters, planets, starships, species, vehicles, images] = await Promise.all([
            this.peopleService.findByNames(value.characters || []),
            this.planetsService.findByNames(value.planets || []),
            this.starshipsService.findByNames(value.starships || []),
            this.speciesService.findByNames(value.species || []),
            this.vehiclesService.findByNames(value.vehicles || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(Film, {
            ...value,
            characters,
            planets,
            starships,
            species,
            vehicles,
            images,
        });
    }
}