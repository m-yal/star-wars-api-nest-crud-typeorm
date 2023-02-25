import { Files } from "./../../files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";

interface IPlanetsBaseData {
    rotation_period?: string;
    orbital_period?: string;
    diameter?: string;
    climate?: string;
    gravity?: string;
    terrain?: string;
    surface_water?: string;
    population?: string;
}

interface IPlanetsRelations {
    residents?: People[];
    films?: Films[];
    images?: Files[];
}

export interface IPlanetsEntity extends IPlanetsBaseData, IPlanetsRelations {}