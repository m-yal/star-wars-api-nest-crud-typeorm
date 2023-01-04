import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { People } from './entities/people.entity';
import { Planets } from './entities/planets.entity';
import { Species } from './entities/species.entity';
import { Starships } from './entities/starships.entity';
import { Vehicles } from './entities/vehicles.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CrudRepositories, Unit, UnitTypes, UnitTypeEnum, UpToTenUnitsPage } from '../../types/types';
import * as fs from 'fs';
import { UNITS_RELATIONS_FIELDS_MAP, UNITS_PER_PAGE } from './constants';
import { UnitRepository } from './interfaces/unit-repository.interface';

@Injectable()
export class MySQLUnitsRepository implements UnitRepository {

    constructor(
        @InjectRepository(People) private readonly peopleRepository: Repository<People>,
        @InjectRepository(Films) private readonly filmsRepository: Repository<Films>,
        @InjectRepository(Planets) private readonly planetsRepository: Repository<Planets>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Starships) private readonly starshipsRepository: Repository<Starships>,
        @InjectRepository(Vehicles) private readonly vehiclesRepository: Repository<Vehicles>,  
    ){}
    
    async get(page: number, unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        this.validate(+page);
        const pageIndex: number = page - 1;
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const units: Unit[] = await currentUnitRepository.find(this.generateFindUpToTenUnitsOptions(pageIndex, unitType));
        const allUnitsInRepoAmount: number = await currentUnitRepository.count();
        return await this.assembleGetResponseObject(units, pageIndex, page, allUnitsInRepoAmount);
    }
    
    async add(body: Unit, unitType: UnitTypes): Promise<true> {
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const newUnit: Unit = await this.addUnit(body, unitType);
        await currentUnitRepository.save(newUnit);
        return true;
    }

    async update(body: Unit, id: string, unitType: UnitTypes): Promise<true> {
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const partialData: Unit = body;
        const unitToUpdate: Unit = await currentUnitRepository.findOneByOrFail({id: +id});
        await this.updateUnitRelations(partialData, unitType);
        const unitToSave: Unit = {...unitToUpdate, ...partialData};
        await currentUnitRepository.save(unitToSave);
        return true;
    }

    async delete(id: string, unitType: UnitTypes): Promise<true> {
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const unit: Unit = await currentUnitRepository.findOneOrFail({where: {id: +id}, relations: ["images"]});
        this.deleteImageFilesOf(unit);
        await currentUnitRepository.remove(unit);
        return true;
    }

    


    
    private validate(page: number): void {
        if (!Number.isInteger(page)) throw new HttpException('Invalid input page number: must be integer!', HttpStatus.BAD_REQUEST);
        if (page < 1) throw new HttpException('Invalid input page number: must be bigger than 1!', HttpStatus.BAD_REQUEST);
    }

    private deleteImageFilesOf(unit: Unit): void {
        if (unit.images.length === 0) return;
        for (const image of unit.images) {
            const path: fs.PathLike = `${__dirname}/../../files/${image.filename}`;
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }
    }

    private async updateUnitRelations(partialData: Unit, unitType: UnitTypeEnum): Promise<void> {
        const partialDataFields: string[] = Object.keys(partialData);
        await this.updateArrayRelationFields(partialData, unitType, partialDataFields);
        await this.updateNonArrayRelationFields(partialData, unitType, partialDataFields);
    }

    private async updateArrayRelationFields(partialData: Unit, unitType: UnitTypeEnum, partialDataFields: string[]): Promise<void> {
        for await (const fieldName of partialDataFields) {
            if (!Array.isArray(partialData[fieldName])) continue;
            const relationIDs: string[] = partialData[fieldName];
            partialData[fieldName] = [];
            const relationRepository: CrudRepositories = await this.defineRepositoryForRelationSetting(unitType, fieldName);
            for await (const id of relationIDs) {
                await partialData[fieldName].push(await relationRepository.findOneByOrFail({id: +id}));
            }
        }
    }

    private async updateNonArrayRelationFields(partialData: Unit, unitType: UnitTypeEnum, partialDataFields: string[]): Promise<void> {
        const homeworldRelFieldName: string = "homeworldRel";
        if (unitType === UnitTypeEnum.People && partialDataFields.find((field: string) => field === homeworldRelFieldName)) {
            partialData[homeworldRelFieldName] = await this.planetsRepository.findOneByOrFail({id: partialData[homeworldRelFieldName]});
        }
    }

    private async addUnit(body: Unit, unitType: UnitTypeEnum): Promise<Unit> {
        const newUnit: Unit = body;
        const relationsFields: string[] = Object.keys(newUnit).filter(field => Array.isArray(newUnit[field]));
        for await (const field of relationsFields) {
            await this.setRelations(newUnit, field, unitType);
        }
        return newUnit;
    }

    private async setRelations(newUnit: Unit, field: string, unitType: UnitTypeEnum): Promise<void> {
        const relationsIds: number[] = await newUnit[field];
        let relationUnits: Unit | Unit[] = this.defineContainerForRelationsUnits(field, unitType);
        const relationUnitsRepo: Repository<Unit> = await this.defineRepositoryForRelationSetting(unitType, field);
        for await (const id of relationsIds) {
            const realtionUnit: Unit = await relationUnitsRepo.findOneBy({id: id});
            if (Array.isArray(relationUnits)) {
                relationUnits.push(realtionUnit);
            } else {
                relationUnits = realtionUnit;
            }
        }
        newUnit[field] = relationUnits;
    }

    private defineContainerForRelationsUnits(field: string, unitType: UnitTypeEnum): Unit | Unit[] {
        if (unitType === UnitTypeEnum.People && field === "homeworldRel") {
            return;
        } else {
            return [];
        }
    }

    private async defineRepositoryForRelationSetting(unitType: UnitTypeEnum, field: string): Promise<Repository<Unit>> {
        if (unitType === UnitTypeEnum.People) {
            switch (field) {
                case "homeworldRel": return this.planetsRepository;
                case "filmsRel": return this.filmsRepository;
                case "speciesRel": return this.speciesRepository;
                case "vehiclesRel": return this.vehiclesRepository;
                case "starshipsRel": return this.starshipsRepository;
                default: throw new BadRequestException(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Films) {
            switch (field) {
                case "charactersRel": return this.peopleRepository;
                case "planetsRel": return this.planetsRepository;
                case "starshipsRel": return this.starshipsRepository;
                case "vehiclesRel": return this.vehiclesRepository;
                case "speciesRel": return this.speciesRepository;
                default: throw new BadRequestException(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Planets) {
            switch (field) {
                case "residentsRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new BadRequestException(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Vehicles) {
            switch (field) {
                case "pilotsRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new BadRequestException(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Species) {
            switch (field) {
                case "peopleRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new BadRequestException(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Starships) {
            switch (field) {
                case "pilotsRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new BadRequestException(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else {
            throw new BadRequestException("No such unit type repository found");
        }
    }

    private getRepoBy(unitType: UnitTypes): CrudRepositories {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleRepository;
            case UnitTypeEnum.Films: return this.filmsRepository;
            case UnitTypeEnum.Planets: return this.planetsRepository;
            case UnitTypeEnum.Species: return this.speciesRepository;
            case UnitTypeEnum.Starships: return this.starshipsRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesRepository;   
            default: throw new BadRequestException("No such repository found!");
        }
    }

    /* RelationLoadStrategy is "query", beacuse on my device 
    occurs "FATAL ERROR: Reached heap limit Allocation failed 
    - JavaScript heap out of memory" during fetching up to ten films */
    private generateFindUpToTenUnitsOptions(pageIndex: number, unitType: UnitTypes): FindManyOptions {
        return {
            order: {
                created: "DESC"
            },
            take: UNITS_PER_PAGE,
            skip: pageIndex * UNITS_PER_PAGE,
            relations: UNITS_RELATIONS_FIELDS_MAP.get(unitType),
            relationLoadStrategy: "query", 
        }
    }

    private async assembleGetResponseObject(units: Unit[], pageIndex: number, page: number, allUnitsInRepoAmount: number): Promise<UpToTenUnitsPage> {
        return {
            units: units,
            hasNext: page * UNITS_PER_PAGE < allUnitsInRepoAmount ? true : false,
            hasPrev: pageIndex === 0 ? false : true
        }
    }
}