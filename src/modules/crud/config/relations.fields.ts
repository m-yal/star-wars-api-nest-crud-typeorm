export const FILMS_RELATIONS_FIELDS: string[] = ["character", "planets", "starships", "vehicles", "species"];
export const PEOPLE_RELATIONS_FIELDS: string[] = ["homeworld", "films", "species", "vehicles", "starships"];
export const PLANETS_RELATIONS_FIELDS: string[] = ["residents", "films"];
export const SPECIES_RELATIONS_FIELDS: string[] = ["homeworld", "people", "films"];
export const STARSHIPS_RELATIONS_FIELDS: string[] = ["pilots", "films"];
export const VEHICLES_RELATIONS_FIELDS: string[] = ["pilots", "films"];