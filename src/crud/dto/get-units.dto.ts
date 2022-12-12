import { Unit } from "../../types/types";

export class GetUnitsDto {
    data: {
        units: Unit[];
        hasNext: boolean;
        hasPrev: boolean;
    }
}