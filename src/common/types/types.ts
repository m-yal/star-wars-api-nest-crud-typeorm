import { Films } from "src/modules/crud/films/films.entity";
import { People } from "src/modules/crud/people/people.entity";
import { Planets } from "src/modules/crud/planets/planets.entity";
import { Species } from "src/modules/crud/species/species.entity";
import { Starships } from "src/modules/crud/starships/starships.entity";
import { Vehicles } from "src/modules/crud/vehicles/vehicles.entity";
import { Repository } from "typeorm";

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
