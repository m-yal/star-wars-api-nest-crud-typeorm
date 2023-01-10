import { UnitTypeEnum } from "src/common/types/types";

class MapsGenerator {
    static generateRelationFieldsMap(): Map<UnitTypeEnum, string[]> {
        const map = new Map();
        map.set(UnitTypeEnum.People, ["homeworldRel", "filmsRel", "speciesRel", "vehiclesRel", "starshipsRel", "images"]);
        map.set(UnitTypeEnum.Films, ["charactersRel", "planetsRel", "starshipsRel", "vehiclesRel", "speciesRel", "images"]);
        map.set(UnitTypeEnum.Planets, ["residentsRel", "filmsRel", "images"]);
        map.set(UnitTypeEnum.Species, ["homeworldRel", "peopleRel", "filmsRel", "images"]);
        map.set(UnitTypeEnum.Starships, ["pilotsRel", "filmsRel", "images"]);
        map.set(UnitTypeEnum.Vehicles, ["pilotsRel", "filmsRel", "images"]);
        return map;
    }
}

export const UNITS_RELATIONS_FIELDS_MAP: Map<UnitTypeEnum, string[]> = MapsGenerator.generateRelationFieldsMap();
export const TEN_UNITS_PER_PAGE: number = 10;