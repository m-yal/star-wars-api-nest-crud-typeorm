import { Planet } from "../planets/planets.entity";
import { Specie } from "../species/species.entity";
import { Starship } from "../starships/starships.entity";
import { Vehicle } from "../vehicles/vehicles.entity";
import { Film } from "../films/films.entity";
import { File } from "../../files/file.entity";

export interface IPeopleBaseData {
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
}

export interface IPeopleRelations {
    homeworld?: Planet;
    films?: Film[];
    species?: Specie[];
    vehicles?: Vehicle[];
    starships?: Starship[];
    images?: File[];
}

export interface IPeopleEntity extends IPeopleBaseData, IPeopleRelations {}