import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";
import { Films } from "../films/films.entity";
import { Files } from "src/modules/files/file.entity";

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
    homeworld?: Planets;
    films?: Films[];
    species?: Species[];
    vehicles?: Vehicles[];
    starships?: Starships[];
    images?: Files[];
}

export interface IPeopleEntity extends IPeopleBaseData, IPeopleRelations {}