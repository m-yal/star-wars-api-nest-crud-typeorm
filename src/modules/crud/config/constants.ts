import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";

export const TEN_UNITS_PER_PAGE: number = 10;
export const ALL_UNITS_ENTITIES: EntityClassOrSchema[] = [
    People, Films, Planets,
    Species, Starships, Vehicles
]