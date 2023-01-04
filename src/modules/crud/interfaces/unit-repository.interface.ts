import { Unit, UnitTypes, UpToTenUnitsPage } from "src/types/types"

export interface UnitRepository {
    get(page: number, unitType: UnitTypes): Promise<UpToTenUnitsPage>;
    add(body: Unit, unitType: UnitTypes): Promise<true>;
    update(body: Unit, id: string, unitType: UnitTypes): Promise<true>;
    delete(id: string, unitType: UnitTypes): Promise<true>;
}