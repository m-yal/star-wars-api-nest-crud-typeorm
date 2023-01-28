import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";

interface IVehiclesBaseData {
    model?: string;
    manufacturer?: string;
    cost_in_credits?: string;
    length?: string;
    max_atmosphering_speed?: string;
    crew?: string;
    passengers?: string;
    cargo_capacity?: string;
    consumables?: string;
    vehicle_class?: string;
}

interface IVehiclesRelations {
    pilots?: People[];
    films?: Films[];
    images?: Files[];
}

export interface IVehiclesEntity extends IVehiclesBaseData, IVehiclesRelations {}