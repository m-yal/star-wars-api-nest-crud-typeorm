import { Repository } from "typeorm";
import { Films } from "../entities/films.entity";
import { People } from "../entities/people.entity";
import { Planets } from "../entities/planets.entity";
import { Species } from "../entities/species.entity";
import { Starships } from "../entities/starships.entity";
import { Vehicles } from "../entities/vehicles.entity";

export enum UnitTypeEnum {
    People = "people",
    Films = "films",
    Planets = "planets",
    Starhips = "starships",
    Species = "species",
    Vehicles = "vehicles"
}
export type Unit = People | Films | Planets | Starships | Species | Vehicles;
export type UnitTypes = UnitTypeEnum.People | UnitTypeEnum.Films 
    | UnitTypeEnum.Planets | UnitTypeEnum.Starhips 
    | UnitTypeEnum.Species | UnitTypeEnum.Vehicles;
export type CrudRepositories = Repository<Unit>;
