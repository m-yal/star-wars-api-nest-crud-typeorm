import { Repository } from "typeorm";
import { Films } from "../../modules/crud/films/films.entity";
import { People } from "../../modules/crud/people/people.entity";
import { Planets } from "../../modules/crud/planets/planets.entity";
import { Species } from "../../modules/crud/species/species.entity";
import { Starships } from "../../modules/crud/starships/starships.entity";
import { Vehicles } from "../../modules/crud/vehicles/vehicles.entity";

export enum UnitTypeEnum {
    People = "people",
    Films = "films",
    Planets = "planets",
    Starships = "starships",
    Species = "species",
    Vehicles = "vehicles"
}
export enum FilesRepositoryType {
    AWS = "AWS",
    FS = "FS"
}
export type Units = People | Films | Planets | Starships | Species | Vehicles;
export type CrudRepositories = Repository<Units>;
export type RelationField = "homeworldRel" | "filmsRel" | "speciesRel" | "vehiclesRel" 
    | "starshipsRel" | "charactersRel" | "planetsRel" | "residentsRel" 
    | "pilotsRel" | "peopleRel" | "images";
export type UnitRecordValue = typeof People | typeof Planets | typeof Starships | typeof Vehicles | typeof Species | typeof Species;
export interface UpToTenUnitsPage<T extends Units> {
    units: T[],
    hasNext: boolean,
    hasPrev: boolean
}
export type FileMymeTypeFilter = (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export type ApplyDecorators = <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
