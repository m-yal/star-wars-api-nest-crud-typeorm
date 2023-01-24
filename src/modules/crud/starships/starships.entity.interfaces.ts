import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";

interface IStarshipsBaseData {
    model?: string;
    manufacturer?: string;
    cost_in_credits?: number;
    length?: number;
    max_atmosphering_speed?: number;
    crew?: number;
    passengers?: number;
    cargo_capacity?: number;
    consumables?: string;
    hyperdrive_rating?: number;
    MGLT?: number;
    starship_class?: string;
}

interface IStarshipsRelations {
    pilots?: People[];
    films?: Films[];
    images?: Files[];
}

export interface IStarshipsEntity extends IStarshipsBaseData, IStarshipsRelations {}