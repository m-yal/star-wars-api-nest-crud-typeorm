export const FILMS_RELATIONS_FIELDS: string[] = ["characters", "planets", "starships", "vehicles", "species", "images"];
export const PEOPLE_RELATIONS_FIELDS: string[] = ["homeworld", "films", "species", "vehicles", "starships", "images"];
export const PLANETS_RELATIONS_FIELDS: string[] = ["residents", "films", "images"];
export const SPECIES_RELATIONS_FIELDS: string[] = ["homeworld", "people", "films", "images"];
export const STARSHIPS_RELATIONS_FIELDS: string[] = ["pilots", "films", "images"];
export const VEHICLES_RELATIONS_FIELDS: string[] = ["pilots", "films", "images"];