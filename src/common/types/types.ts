import { Repository } from "typeorm";

import { Film } from "../../modules/units/films/films.entity";
import { Person } from "../../modules/units/people/people.entity";
import { Planet } from "../../modules/units/planets/planets.entity";
import { Specie } from "../../modules/units/species/species.entity";
import { Starship } from "../../modules/units/starships/starships.entity";
import { Vehicle } from "../../modules/units/vehicles/vehicles.entity";

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
export type Units = Person | Film | Planet | Starship | Specie | Vehicle;
export type CrudRepositories = Repository<Units>;
export type RelationField = "homeworldRel" | "filmsRel" | "speciesRel" | "vehiclesRel" 
    | "starshipsRel" | "charactersRel" | "planetsRel" | "residentsRel" 
    | "pilotsRel" | "peopleRel" | "images";
export type UnitRecordValue = typeof Person | typeof Planet | typeof Starship | typeof Vehicle | typeof Specie | typeof Specie;
export interface UpToTenUnitsPage<T extends Units> {
    units: T[],
    hasNext: boolean,
    hasPrev: boolean
}
export type FileMymeTypeFilter = (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export type ApplyDecorators = <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;