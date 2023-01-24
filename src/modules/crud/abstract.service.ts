import { Injectable, NotFoundException } from "@nestjs/common";
import { Units, UpToTenUnitsPage } from "src/common/types/types";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, In, Repository } from "typeorm";
import { TEN_UNITS_PER_PAGE } from "./config/constants";

@Injectable()
export abstract class SwapiAbstractService<T extends Units> {

    abstract readonly relationFields: string[];
    private repository: Repository<T>

    constructor(repository: Repository<T>) { 
        this.repository = repository;
    }

    async exists(name: string): Promise<boolean> {
        const existsFindQueryOptions: FindOneOptions = {
            where: { name: name },
            select: ['name'],
        }
        const exists = await this.repository.findOne(existsFindQueryOptions);
        return Boolean(exists);
    }

    async findByNames(names: string[]): Promise<T[]> {
        const findByNamesOptions: FindOptionsWhere<any> = {
            name: In(names),
        }
        if (!names.length) {
            return [];
        }
        try {
            return this.repository.findBy(findByNamesOptions);
        } catch (error) {
            throw new NotFoundException(`Units with names ${names} not found in database`);
        }
    }

    async create(unit: T): Promise<T> {
        const newUnit = this.repository.create(unit);
        return this.repository.save(newUnit);
    }

    async getUpToTen(page: number): Promise<UpToTenUnitsPage<T>> {
        const pageIndex: number = page - 1;
        const units = this.repository.find(this.generateFindUpToTenUnitsOptions(pageIndex));
        const allUnitsInRepoAmount = this.repository.count();
        Promise.all([units, allUnitsInRepoAmount]);
        return this.assembleGetResponseData(await units, pageIndex, page, await allUnitsInRepoAmount);
    }

    async findOne(name: string): Promise<T> {
        try {
            const findOneOptions: FindOneOptions = {
                where: { name: name },
                select: ['name'],
            }
            return this.repository.findOneOrFail(findOneOptions);
        } catch (error) {
            throw new Error(`Unit with name ${name} not found`);
        }
    }

    async update(name: string, updates: T): Promise<true> {
        const findOneOptions: FindOneOptions = {
            where: { name },
            relations: this.relationFields,
        }
        const unit = await this.repository.findOne(findOneOptions);
        this.removePresentRelations(unit);
        await this.repository.save(unit);
        const updatedPeople = this.repository.merge(unit, updates);
        await this.repository.save(updatedPeople);
        return true;
    }

    async delete(name: string): Promise<true> {
        await this.repository.delete(name);
        return true;
    }

    private generateFindUpToTenUnitsOptions(pageIndex: number): FindManyOptions {
        return {
            order: {
                created: "DESC"
            },
            take: TEN_UNITS_PER_PAGE,
            skip: pageIndex * TEN_UNITS_PER_PAGE,
            relations: this.relationFields,
            relationLoadStrategy: "query",
        }
    }

    private assembleGetResponseData(units: T[], pageIndex: number, page: number, allUnitsCount: number): UpToTenUnitsPage<T> {
        return {
            units: units,
            hasNext: page * TEN_UNITS_PER_PAGE < allUnitsCount ? true : false,
            hasPrev: pageIndex === 0 ? false : true
        }
    }

    private removePresentRelations(unit: Units) {
        for (const relation of this.relationFields) {
            unit[relation] = [];
        }
    }
}