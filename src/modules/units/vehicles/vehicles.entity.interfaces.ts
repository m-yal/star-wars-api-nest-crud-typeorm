import { File } from "../../files/file.entity";
import { Film } from "../films/films.entity";
import { Person } from "../people/people.entity";

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
    pilots?: Person[];
    films?: Film[];
    images?: File[];
}

export interface IVehiclesEntity extends IVehiclesBaseData, IVehiclesRelations {}