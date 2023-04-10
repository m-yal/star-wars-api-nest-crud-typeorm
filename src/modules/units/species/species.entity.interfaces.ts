import { File } from "../../files/file.entity";
import { Film } from "../films/films.entity";
import { Person } from "../people/people.entity";
import { Planet } from "../planets/planets.entity";

interface ISpeciesBaseData {
    classification?: string;
    designation?: string;
    average_height?: string;
    skin_colors?: string;
    hair_colors?: string;
    eye_colors?: string;
    average_lifespan?: string;
    language?: string;
}

interface ISpeciesRelations {
    homeworld?: Planet;
    people?: Person[];
    films?: Film[];
    images?: File[];
}

export interface ISpeciesEntity extends ISpeciesBaseData, ISpeciesRelations {}