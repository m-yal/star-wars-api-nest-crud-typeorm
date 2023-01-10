import { Films } from "src/modules/crud/config/entities/films.entity";
import { People } from "src/modules/crud/config/entities/people.entity";
import { Planets } from "src/modules/crud/config/entities/planets.entity";
import { Species } from "src/modules/crud/config/entities/species.entity";
import { Starships } from "src/modules/crud/config/entities/starships.entity";
import { Vehicles } from "src/modules/crud/config/entities/vehicles.entity";
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from "src/modules/files/config/entities/image.entity";
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
export type UnitImage = PeopleImage | FilmsImage | PlanetsImage | SpeciesImage | StarshipsImage | VehiclesImage; 
export type Unit = People | Films | Planets | Starships | Species | Vehicles;
export type UnitTypes = UnitTypeEnum.People | UnitTypeEnum.Films 
    | UnitTypeEnum.Planets | UnitTypeEnum.Starships 
    | UnitTypeEnum.Species | UnitTypeEnum.Vehicles;
export type CrudRepositories = Repository<Unit>;
export type RelationField = "homeworldRel" | "filmsRel" | "speciesRel" | "vehiclesRel" 
    | "starshipsRel" | "charactersRel" | "planetsRel" | "residentsRel" 
    | "pilotsRel" | "peopleRel" | "images";
export type UnitRecordValue = typeof People | typeof Planets | typeof Starships | typeof Vehicles | typeof Species | typeof Species;
export type Images = PeopleImage | FilmsImage | PlanetsImage | SpeciesImage | StarshipsImage | VehiclesImage;
export interface UpToTenUnitsPage {
    units: Unit[],
    hasNext: boolean,
    hasPrev: boolean
}
export type FileMymeTypeFilter = (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export type ApplyDecorators = <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
