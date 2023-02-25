import { Files } from "./../../files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";

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
    pilots?: People[];
    films?: Films[];
    images?: Files[];
}

export interface IStarshipsEntity extends IStarshipsBaseData, IStarshipsRelations {}