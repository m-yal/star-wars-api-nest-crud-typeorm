import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { People } from './entities/people.entity';
import { Planets } from './entities/planets.entity';
import { Species } from './entities/species.entity';
import { Starships } from './entities/starships.entity';
import { Vehicles } from './entities/vehicles.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { GetUnitsDto } from './dto/get-units.dto';
import { ExecutedDto } from './dto/executed.dto';
import { CrudRepositories, Unit, UnitTypes, UnitTypeEnum } from './types/types';

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
    
    async get(page: number, unitType: UnitTypes): Promise<GetUnitsDto> {
        const pageIndex: number = page - 1;
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const units: Unit[] = await currentUnitRepository.find(this.generateFindUpToTenUnitsOptions(pageIndex, unitType));
        const allUnitsInRepoAmount: number = await currentUnitRepository.count();
        return await this.assembleReturnObject(units, pageIndex, page, allUnitsInRepoAmount);
    }
    
    async add(body: any, unitType: UnitTypes): Promise<ExecutedDto> {
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const newUnit = body; //todo for realtion use only ...Rel type in DTO
        if (unitType === UnitTypeEnum.People) {
            const relationsFields = Object.keys(newUnit).filter(field => Array.isArray(newUnit[field]));
            // console.log("relationsFields " + relationsFields);
            for await (const field of relationsFields) {
                console.log("field " + field);
                const relationsIds = newUnit[field];
                console.log("relationsIds " + relationsIds);
                let relationUnits = [];
                const relationUnitsRepo = await this.defineRepositoryForRelationSetting(unitType, field);
                for await (const id of relationsIds) {
                    const unitToPush = await relationUnitsRepo.findOneBy({id: id});
                    console.log("unitToPush " + unitToPush);
                    if (field === "homeworldRel") {
                        relationUnits = unitToPush;
                    } else {
                        relationUnits.push(unitToPush);
                    }
                }
                console.log("relationUnits before assigning to newUnit object: " + JSON.stringify(relationUnits));
                newUnit[field] = relationUnits;
                // console.log("relationUnits after pushing into it: " + JSON.stringify(newUnit[field]));
            }
        }
        console.log("newUnit before adding to DB: " + JSON.stringify(newUnit));
        await currentUnitRepository.save(newUnit);
        return {executed: true};
    }

    private async defineRepositoryForRelationSetting(unitType: UnitTypeEnum, field: string): Promise<Repository<any>> {
        if (unitType === UnitTypeEnum.People) {
            switch (field) {
                case "homeworldRel": return this.planetsRepository;
                case "filmsRel": return this.filmsRepository;
                case "speciesRel": return this.speciesRepository;
                case "vehiclesRel": return this.vehiclesRepository;
                case "starshipsRel": return this.starshipsRepository;
                default: throw new Error("No such relation field found in this enitity");
            }
        }


    }

    async update(body: Unit, id: string, unitType: UnitTypes): Promise<ExecutedDto> {//todo remove id: string later
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        await currentUnitRepository.update({url: id}, body);
        return {executed: true};
    }

    async delete(id: string, unitType: UnitTypes): Promise<ExecutedDto> {
        const currentUnitRepository: CrudRepositories = this.getRepoBy(unitType);
        const unit: Unit = await currentUnitRepository.findOneBy({url: id});
        currentUnitRepository.remove(unit);
        return {executed: true};
    }

    private getRepoBy(unitType: UnitTypes): CrudRepositories {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleRepository;
            case UnitTypeEnum.Films: return this.filmsRepository;
            case UnitTypeEnum.Planets: return this.planetsRepository;
            case UnitTypeEnum.Species: return this.speciesRepository;
            case UnitTypeEnum.Starhips: return this.starshipsRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesRepository;   
            default: throw new Error("No such repository found!");
        }
    }

    /* RelationLoadStrategy is "query", beacuse on my device 
    occurs "FATAL ERROR: Reached heap limit Allocation failed 
    - JavaScript heap out of memory" during fetching up to ten films */
    private generateFindUpToTenUnitsOptions(pageIndex:  number, unitType: UnitTypes): FindManyOptions {
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

    private defineRelationsFor(unitType: UnitTypes): string[] {
        switch(unitType) {
            case UnitTypeEnum.People: return ["homeworldRel", "filmsRel", "speciesRel", "vehiclesRel", "starshipsRel"];
            case UnitTypeEnum.Films: return ["charactersRel", "planetsRel", "starshipsRel", "vehiclesRel", "speciesRel"];
            case UnitTypeEnum.Planets: return ["residentsRel", "filmsRel"];
            case UnitTypeEnum.Species: return ["homeworldRel", "peopleRel", "filmsRel"];
            case UnitTypeEnum.Starhips: return ["pilotsRel", "filmsRel"];
            case UnitTypeEnum.Vehicles: return ["pilotsRel", "filmsRel"];
            default: throw new Error("No realtions found for this unit type during getting up to 10 units")
        }
    }

    private async assembleReturnObject(units: Unit[], pageIndex: number, page: number, allUnitsInRepoAmount: number): Promise<GetUnitsDto> {
        return {
            data: {
                units: units,
                hasNext: page * this.UNITS_PER_PAGE < allUnitsInRepoAmount ? true : false,
                hasPrev: pageIndex === 0 ? false : true
            }
        }
    }
}