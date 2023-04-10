import { File } from "../../files/file.entity";
import { Film } from "../films/films.entity";
import { Person } from "../people/people.entity";

interface IStarshipsBaseData {
    model?: string;
    manufacturer?: string;
    cost_in_credits?: string;
    length?: string;
    max_atmosphering_speed?: string;
    crew?: string;
    passengers?: string;
    cargo_capacity?: string;
    consumables?: string;
    hyperdrive_rating?: string;
    MGLT?: string;
    starship_class?: string;
}

interface IStarshipsRelations {
    pilots?: Person[];
    films?: Film[];
    images?: File[];
}

export interface IStarshipsEntity extends IStarshipsBaseData, IStarshipsRelations {}