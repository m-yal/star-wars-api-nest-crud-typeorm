import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

import { Film } from "../films/films.entity";
import { Person } from "../people/people.entity";
import { Planet } from "../planets/planets.entity";
import { Specie } from "../species/species.entity";
import { Starship } from "../starships/starships.entity";
import { Vehicle } from "../vehicles/vehicles.entity";

export const TEN_UNITS_PER_PAGE: number = 10;
export const ALL_UNITS_ENTITIES: EntityClassOrSchema[] = [
    Person, Film, Planet,
    Specie, Starship, Vehicle
]