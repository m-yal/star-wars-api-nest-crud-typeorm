import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from "src/files/entities/image.entity";
import { Repository } from "typeorm";
import { Films } from "../crud/entities/films.entity";
import { People } from "../crud/entities/people.entity";
import { Planets } from "../crud/entities/planets.entity";
import { Species } from "../crud/entities/species.entity";
import { Starships } from "../crud/entities/starships.entity";
import { Vehicles } from "../crud/entities/vehicles.entity";

export enum UnitTypeEnum {
    People = "people",
    Films = "films",
    Planets = "planets",
    Starships = "starships",
    Species = "species",
    Vehicles = "vehicles"
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