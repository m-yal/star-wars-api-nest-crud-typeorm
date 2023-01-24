import { Units, UpToTenUnitsPage } from "src/common/types/types";

export interface ICrudActions<T extends Units> {
    get(page: number): Promise<UpToTenUnitsPage<T>>;
    add(body: T): Promise<true>;
    update(body: T, id: number): Promise<true>;
    delete(id: string): Promise<true>;
}