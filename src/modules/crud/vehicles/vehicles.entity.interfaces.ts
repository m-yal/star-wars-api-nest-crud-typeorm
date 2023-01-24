import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";

interface IVehiclesBaseData {
    model?: string;
    manufacturer?: string;
    cost_in_credits?: number;
    length?: number;
    max_atmosphering_speed?: number;
    crew?: number;
    passengers?: number;
    cargo_capacity?: number;
    consumables?: string;
    vehicle_class?: string;
}

interface IVehiclesRelations {
    pilots?: People[];
    films?: Films[];
    images?: Files[];
}

export interface IVehiclesEntity extends IVehiclesBaseData, IVehiclesRelations {}