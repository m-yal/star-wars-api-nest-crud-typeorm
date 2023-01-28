import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";

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
    homeworld?: Planets;
    people?: People[];
    films?: Films[];
    images?: Files[];
}

export interface ISpeciesEntity extends ISpeciesBaseData, ISpeciesRelations {}