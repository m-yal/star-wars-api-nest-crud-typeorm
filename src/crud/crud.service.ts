import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { People } from './entities/people.entity';
import { Planets } from './entities/planets.entity';
import { Species } from './entities/species.entity';
import { Starships } from './entities/starships.entity';
import { Vehicles } from './entities/vehicles.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CrudRepositories, Unit, UnitTypes, UnitTypeEnum, RelationField, UpToTenUnitsPage } from '../types/types';
import * as fs from 'fs';


@Injectable()
export class CrudService {

    private readonly UNITS_PER_PAGE: number = 10;

    constructor(
        @InjectRepository(People) private readonly peopleRepository: Repository<Unit>,
        @InjectRepository(Films) private readonly filmsRepository: Repository<Unit>,
        @InjectRepository(Planets) private readonly planetsRepository: Repository<Unit>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Unit>,
        @InjectRepository(Starships) private readonly starshipsRepository: Repository<Unit>,
        @InjectRepository(Vehicles) private readonly vehiclesRepository: Repository<Unit>,
    ){}
    
    async get(page: number, unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        this.validate(+page);
        const pageIndex: number = page - 1;
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const units: Unit[] = await currentUnitRepository.find(this.generateFindUpToTenUnitsOptions(pageIndex, unitType));
        const allUnitsInRepoAmount: number = await currentUnitRepository.count();
        return await this.assembleReturnObject(units, pageIndex, page, allUnitsInRepoAmount);
    }
    
    async add(body: Unit, unitType: UnitTypes): Promise<true> {
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const newUnit: Unit = body;
        await this.addUnit(newUnit, unitType);
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
            } else {
                throw new NotFoundException('File for deletion not found');
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

    private async addUnit(newUnit: Unit, unitType: UnitTypeEnum): Promise<void> {
        const relationsFields: string[] = Object.keys(newUnit).filter(field => Array.isArray(newUnit[field]));
        for await (const field of relationsFields) {
            const relationsIds: number[] = await newUnit[field];
            let relationUnits: Unit | Unit[] = this.defineContainerForRelationsUnits(field, unitType);
            const relationUnitsRepo: Repository<Unit> = await this.defineRepositoryForRelationSetting(unitType, field);
            for await (const id of relationsIds) {
                const unitToPush: Unit = await relationUnitsRepo.findOneBy({id: id});
                if (Array.isArray(relationUnits)) {
                    relationUnits.push(unitToPush);
                } else {
                    relationUnits = unitToPush;
                }
            }
            newUnit[field] = relationUnits;
        }
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
                default: throw new Error(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Films) {
            switch (field) {
                case "charactersRel": return this.peopleRepository;
                case "planetsRel": return this.planetsRepository;
                case "starshipsRel": return this.starshipsRepository;
                case "vehiclesRel": return this.vehiclesRepository;
                case "speciesRel": return this.speciesRepository;
                default: throw new Error(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Planets) {
            switch (field) {
                case "residentsRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new Error(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Vehicles) {
            switch (field) {
                case "pilotsRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new Error(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Species) {
            switch (field) {
                case "peopleRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new Error(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else if (unitType === UnitTypeEnum.Starships) {
            switch (field) {
                case "pilotsRel": return this.peopleRepository;
                case "filmsRel": return this.filmsRepository;
                default: throw new Error(`No such relation for ${field} field found in this unitType (${unitType})`);
            }
        } else {
            throw new Error("No such unit type repository found");
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
            default: throw new Error("No such repository found!");
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
            take: this.UNITS_PER_PAGE,
            skip: pageIndex * this.UNITS_PER_PAGE,
            relations: this.defineRelationsFor(unitType),
            relationLoadStrategy: "query", 
        }
    }

    private defineRelationsFor(unitType: UnitTypes): RelationField[] {
        switch(unitType) {
            case UnitTypeEnum.People: return ["homeworldRel", "filmsRel", "speciesRel", "vehiclesRel", "starshipsRel", "images"];
            case UnitTypeEnum.Films: return ["charactersRel", "planetsRel", "starshipsRel", "vehiclesRel", "speciesRel", "images"];
            case UnitTypeEnum.Planets: return ["residentsRel", "filmsRel", "images"];
            case UnitTypeEnum.Species: return ["homeworldRel", "peopleRel", "filmsRel", "images"];
            case UnitTypeEnum.Starships: return ["pilotsRel", "filmsRel", "images"];
            case UnitTypeEnum.Vehicles: return ["pilotsRel", "filmsRel", "images"];
            default: throw new Error("No realtions found for this unit type during getting up to 10 units")
        }
    }

    private async assembleReturnObject(units: Unit[], pageIndex: number, page: number, allUnitsInRepoAmount: number): Promise<UpToTenUnitsPage> {
        return {
            units: units,
            hasNext: page * this.UNITS_PER_PAGE < allUnitsInRepoAmount ? true : false,
            hasPrev: pageIndex === 0 ? false : true
        }
    }
}