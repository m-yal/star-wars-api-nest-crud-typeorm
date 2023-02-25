import { Files } from "./../../files/file.entity";
import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";

interface IFilmsBaseData {
    name?: string;
    episode_id?: string
    opening_crawl?: string;
    director?: string;
    producer?: string;
}

interface IFilmsRelations {
    characters?: People[];
    planets?: Planets[];
    starships?: Starships[];
    vehicles?: Vehicles[];
    species?: Species[];
    images?: Files[];
}

interface IFilmsDates {
    release_date?: Date;
}

export interface IFilmsEntity extends IFilmsBaseData, IFilmsRelations, IFilmsDates {}