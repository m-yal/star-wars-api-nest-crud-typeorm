import { File } from "../../files/file.entity";
import { Person } from "../people/people.entity";
import { Planet } from "../planets/planets.entity";
import { Specie } from "../species/species.entity";
import { Starship } from "../starships/starships.entity";
import { Vehicle } from "../vehicles/vehicles.entity";

interface IFilmsBaseData {
    name?: string;
    episode_id?: string
    opening_crawl?: string;
    director?: string;
    producer?: string;
}

interface IFilmsRelations {
    characters?: Person[];
    planets?: Planet[];
    starships?: Starship[];
    vehicles?: Vehicle[];
    species?: Specie[];
    images?: File[];
}

interface IFilmsDates {
    release_date?: Date;
}

export interface IFilmsEntity extends IFilmsBaseData, IFilmsRelations, IFilmsDates {}