import { File } from "../../files/file.entity";
import { Film } from "../films/films.entity";
import { Person } from "../people/people.entity";

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
    residents?: Person[];
    films?: Film[];
    images?: File[];
}

export interface IPlanetsEntity extends IPlanetsBaseData, IPlanetsRelations {}