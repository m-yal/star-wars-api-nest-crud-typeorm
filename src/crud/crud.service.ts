import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { People } from './entities/people.entity';
import { Planets } from './entities/planets.entity';
import { Species } from './entities/species.entity';
import { Starships } from './entities/starships.entity';
import { Vehicles } from './entities/vehicles.entity';
import { Repository } from 'typeorm';
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
        const currentRepository: CrudRepositories = this.getRepoBy(unitType);
        const units: Unit[] = await currentRepository.find({
            order: {
                created: "DESC"
            },
            take: this.UNITS_PER_PAGE,
            skip: pageIndex * this.UNITS_PER_PAGE
        });
        const count: number = await currentRepository.count();
        return {
            data: {
                units: units,
                hasNext: page * this.UNITS_PER_PAGE < count ? true : false,
                hasPrev: pageIndex === 0 ? false : true
            }
        };
    }
    
    async add(body: Unit, unitType: UnitTypes): Promise<ExecutedDto> {
        const currentRepository: CrudRepositories = this.getRepoBy(unitType);
        await currentRepository.insert(body);
        return {executed: true};
    }

    async update(body: Unit, id: number, unitType: UnitTypes): Promise<ExecutedDto> {
        const currentRepository: CrudRepositories = this.getRepoBy(unitType);
        await currentRepository.update({id: id}, body);
        return {executed: true};
    }

    async delete(id: number, unitType: UnitTypes): Promise<ExecutedDto> {
        const currentRepository: CrudRepositories = this.getRepoBy(unitType);
        const unit: Unit = await currentRepository.findOneBy({id: id});
        currentRepository.remove(unit);
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
}