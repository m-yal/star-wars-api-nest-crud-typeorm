import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";

interface IPlanetsBaseData {
    rotation_period?: number;
    orbital_period?: number;
    diameter?: number;
    climate?: string;
    gravity?: string;
    terrain?: string;
    surface_water?: number;
    population?: number;
}

interface IPlanetsRelations {
    residents?: People[];
    films?: Films[];
    images?: Files[];
}

export interface IPlanetsEntity extends IPlanetsBaseData, IPlanetsRelations {}