import { Repository } from "typeorm";
import { Films } from "../entities/films.entity";
import { People } from "../entities/people.entity";
import { Planets } from "../entities/planets.entity";
import { Species } from "../entities/species.entity";
import { Starships } from "../entities/starships.entity";
import { Vehicles } from "../entities/vehicles.entity";

export enum UnitTypeEnum {
    "people", "films", "planets", "starships", "species", "vehicles"
}
export type Unit = People | Films | Planets | Starships | Species | Vehicles;
export type UnitTypes = UnitTypeEnum.people | UnitTypeEnum.films 
    | UnitTypeEnum.planets | UnitTypeEnum.starships 
    | UnitTypeEnum.species | UnitTypeEnum.vehicles;
export type CrudRepositories = Repository<Unit>;
