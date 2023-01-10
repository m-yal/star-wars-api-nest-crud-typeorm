import { Injectable } from '@nestjs/common';
import { Unit, UnitTypes, UpToTenUnitsPage } from 'src/common/types/types';
import { MySQLUnitsRepository } from './crud-mysql.repository';
import { ICrudActions } from './config/interfaces/crud.actions.interface';

@Injectable()
export class CrudService implements ICrudActions {

    constructor(private readonly repository: MySQLUnitsRepository) {}

    async get(page: number, unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        return this.repository.get(page, unitType);
    }
    async add(body: Unit, unitType: UnitTypes): Promise<true> {
        return this.repository.add(body, unitType);
    }
    async update(body: Unit, id: string, unitType: UnitTypes): Promise<true> {
        return this.repository.update(body, id, unitType);
    }
    async delete(id: string, unitType: UnitTypes): Promise<true> {
        return this.repository.delete(id, unitType);
    }
}