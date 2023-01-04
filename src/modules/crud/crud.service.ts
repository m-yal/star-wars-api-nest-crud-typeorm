import { Injectable } from '@nestjs/common';
import { Unit, UnitTypes, UpToTenUnitsPage } from '../../types/types';
import { MySQLUnitsRepository } from './crud-mysql.repository';

@Injectable()
export class CrudService {

    constructor(private readonly repository: MySQLUnitsRepository) {}

    get(page: number, unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        return this.repository.get(page, unitType);
    }
    add(body: Unit, unitType: UnitTypes): Promise<true> {
        return this.repository.add(body, unitType);
    }
    update(body: Unit, id: string, unitType: UnitTypes): Promise<true> {
        return this.repository.update(body, id, unitType);
    }
    delete(id: string, unitType: UnitTypes): Promise<true> {
        return this.repository.delete(id, unitType);
    }
}