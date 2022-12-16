import { Inject, Injectable } from '@nestjs/common';
import { Unit, UnitTypes, UpToTenUnitsPage } from '../types/types';
import { UnitRepository } from './interfaces/unit-repository.interface';
import { MySQLUnitsRepository } from './crud-mysql.repository';

@Injectable()
export class CrudService implements UnitRepository {

    constructor(private readonly mysqlRepository: MySQLUnitsRepository) {}

    get(page: number, unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        return this.mysqlRepository.get(page, unitType);
    }
    add(body: Unit, unitType: UnitTypes): Promise<true> {
        return this.mysqlRepository.add(body, unitType);
    }
    update(body: Unit, id: string, unitType: UnitTypes): Promise<true> {
        return this.mysqlRepository.update(body, id, unitType);
    }
    delete(id: string, unitType: UnitTypes): Promise<true> {
        return this.mysqlRepository.delete(id, unitType);
    }
}