import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Units, UpToTenUnitsPage } from "src/common/types/types";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, In, Repository } from "typeorm";
import { Files } from "../files/file.entity";
import { FilesService } from "../files/files.service";
import { TEN_UNITS_PER_PAGE } from "./config/constants";

@Injectable()
export abstract class SwapiAbstractService<T extends Units> {

    abstract readonly relationFields: string[];
    private repository: Repository<T>;
    private filesService: FilesService;

    constructor(repository: Repository<T>, @Inject("IFilesActions") filesService?: FilesService) {
        this.repository = repository;
        this.filesService = filesService;
    }

    async exists(name: string): Promise<boolean> {
        if (typeof name !== "string") return false;
        const existsFindQueryOptions: FindOneOptions = {
            where: { name: name },
            select: ['name'],
        }
        const exists = await this.repository.findOne(existsFindQueryOptions);
        return Boolean(exists);
    }

    async findByNames(names: string[]): Promise<T[]> {
        console.log("findByNames: " + JSON.stringify(names));
        if (names.length === 0) return [];
        const findByNamesOptions: FindOptionsWhere<any> = {
            name: In(names),
        }
        const units = await this.repository.findBy(findByNamesOptions);
        if (units.length === 0) {
            throw new NotFoundException(`Units with names (or some of them) ${names} not found or is already binded with other entity in database`);
        }
        return units;
    }

    async create(unit: T): Promise<T> {
        const newUnit: T = this.repository.create(unit);
        const savedUnit: T = await this.repository.save(newUnit);
        return savedUnit;
    }

    public async uploadImages(files: Express.Multer.File[], unitName: string) {
        const filenames = await this.filesService.upload(files);
        const filesRecordsRepository: Repository<Files> = this.repository.manager.getRepository(Files);
        console.log("filenames: " + filenames);
        const filesObjects: Files[] = filenames.map(filename => {
            return filesRecordsRepository.create({ name: filename });
        });
        console.log("filesObjects before saving: " + JSON.stringify(filesObjects));
        await filesRecordsRepository.save(filesObjects);
        const findByNameOptions: FindOneOptions<any> = {
            where: {
                name: unitName,
            },
            relations: ["images"],
            relationLoadStrategy: "query",
        };
        let unit
        try {
            unit = await this.repository.findOneOrFail(findByNameOptions);
        } catch (error) {
            throw new NotFoundException("Unit for adding image record not found");
        }
        console.log("unit.images: " + JSON.stringify(unit.images));
        filesObjects.map((fileObject: File) => {
            unit.images.push(fileObject);
        });
        console.log("unit.images: " + JSON.stringify(unit.images));
        console.log("unit before saving: " + JSON.stringify(unit));
        await this.repository.save(unit);
        console.log("unit after saving: " + JSON.stringify(await this.repository.findOne(findByNameOptions)));
        return filenames;
    }

    async getUpToTen(page: number): Promise<UpToTenUnitsPage<T>> {
        const pageIndex: number = page - 1;
        const units = this.repository.find(this.generateFindUpToTenUnitsOptions(pageIndex));
        const allUnitsInRepoAmount = this.repository.count();
        await Promise.all([units, allUnitsInRepoAmount]);
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

    async update(unitUpdates: T): Promise<T> {
        console.log("Inside update method");
        const findOneOptions: FindOneOptions = {
            where: { name: unitUpdates.name },
            relations: this.relationFields,
        }
        const originalUnit: T = await this.repository.findOne(findOneOptions);
        console.log("originalUnit: " + JSON.stringify(originalUnit));
        this.removePresentRelations(originalUnit);
        console.log("originalUnit after removing present relations: " + JSON.stringify(originalUnit));
        await this.repository.save(originalUnit);
        const updatedUnit = this.repository.merge(originalUnit, unitUpdates);
        console.log("updatedUnit: " + JSON.stringify(updatedUnit));
        return await this.repository.save(updatedUnit);
    }

    async delete(name: string): Promise<{ name: string }> {
        const findOneOptions: FindOptionsWhere<any> = { name: name };
        const unitToRemove: T = await this.repository.findOneByOrFail(findOneOptions);
        await this.repository.remove(unitToRemove);
        return { name };
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