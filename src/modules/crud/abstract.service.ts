import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, In, QueryFailedError, Repository } from "typeorm";
import { Units, UpToTenUnitsPage } from "../../common/types/types";
import { Files } from "../files/entities/file.entity";
import { FilesService } from "../files/files.service";
import { TEN_UNITS_PER_PAGE } from "./config/constants";

@Injectable()
export abstract class SwapiAbstractService<T extends Units> {

    abstract readonly relationFields: string[];
    private repository: Repository<T>;
    private filesService: FilesService;
    private filesRecordsRepository: Repository<Files>;

    constructor(
        repository: Repository<T>, 
        @Inject("IFilesActions") filesService: FilesService,
        @InjectRepository(Files) filesRecordsRepository: Repository<Files>,
    ) {
        this.repository = repository;
        this.filesService = filesService;
        this.filesRecordsRepository = filesRecordsRepository;
    }

    async exists(name: string): Promise<boolean> {
        if (typeof name !== "string") return false;
        const existsFindQueryOptions: FindOneOptions = {
            where: { name: name },
            select: ['name'],
        };
        const exists = await this.repository.findOne(existsFindQueryOptions);
        
        return Boolean(exists);
    }

    async findByNames(names: string[]): Promise<T[]> {
        if (names.length === 0) return [];
        const findByNamesOptions: FindOptionsWhere<any> = {
            name: In(names),
        }
        let units = await this.repository.findBy(findByNamesOptions);
        units = units.filter(unit => unit !== undefined)
        if (units.length === 0) {
            throw new NotFoundException(`Units with names "${names}" not found at all`);
        }
        if (units.length !== names.length) {
            throw new NotFoundException(`Some of units with names "${names}" not found`);
        }
        return units;
    }

    async create(unit: T): Promise<T> {
        await this.checkPresence(unit.name);
        const newUnit: T = this.repository.create(unit);
        const savedUnit: T = await this.repository.save(newUnit);
        return savedUnit;
    }

    public async uploadImages(files: Express.Multer.File[], unitName: string): Promise<string[]> {
        const unit: T = await this.findUnitForBinding(unitName);
        const filenames: string[] = await this.filesService.upload(files);
        const filesObjects: Files[] = await this.recordFilesData(filenames);
        this.assingImagesRecords(unit, filesObjects);
        await this.repository.save(unit);
        return filenames;
    }

    async getUpToTen(page: number): Promise<UpToTenUnitsPage<T>> {
        const pageIndex: number = page - 1;
        const units = await this.repository.find(this.generateFindUpToTenUnitsOptions(pageIndex));
        const allUnitsInRepoAmount = await this.repository.count();
        return this.assembleGetResponseData(units, pageIndex, page, allUnitsInRepoAmount);
    }

    async findOne(name: string): Promise<T> {
        try {
            const findOneOptions: FindOneOptions = {
                where: { name: name },
                select: ['name'],
            }
            return await this.repository.findOneOrFail(findOneOptions);
        } catch (error) {
            throw new NotFoundException(`Unit with name ${name} not found`);
        }
    }

    async update(unitUpdates: T): Promise<T> {
        const findOneOptions: FindOneOptions = {
            where: { name: unitUpdates.name },
            relations: this.relationFields,
        }
        const originalUnit: T = await this.repository.findOneOrFail(findOneOptions);
        const originalUnitWithoutRelations: T = this.removePresentRelations(originalUnit);
        await this.repository.save(originalUnitWithoutRelations);
        const updatedUnit = this.repository.merge(originalUnitWithoutRelations, unitUpdates);
        try {
            return await this.repository.save(updatedUnit);
        } catch (error) {
            throw new BadRequestException(JSON.stringify(error.sqlMessage));
        }
    }

    async delete(name: string): Promise<{ name: string }> {
        const findOneOptions: FindOptionsWhere<any> = { where: { name: name }};
        const unitToRemove: T = await this.repository.findOne(findOneOptions);
        await this.repository.remove(unitToRemove);
        return { name };
    }





    private async checkPresence(name: string) {
        if (await this.exists(name)) {
            throw new BadRequestException(`Unit with name "${name}" already exists in database`)
        }
    }

    private async recordFilesData(filenames: string[]) {
        const filesObjects: Files[] = filenames.map((name: string) => {
            return this.filesRecordsRepository.create({ name });
        });
        return await this.filesRecordsRepository.save(filesObjects);
    }

    private async findUnitForBinding(unitName: string) {
        const findByNameOptions: FindOneOptions<any> = {
            where: {
                name: unitName,
            },
            relations: ["images"],
            relationLoadStrategy: "query",
        };
        try {
            return await this.repository.findOneOrFail(findByNameOptions);
        } catch (error) {
            // await this.filesService.delete(unitName);
            throw new NotFoundException("Unit for adding image record not found");
        }
    }

    private assingImagesRecords(unit: T, filesObjects: Files[]) {
        filesObjects.map((fileObject: File) => {
            unit.images.push(fileObject);
        });
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
            hasPrev: pageIndex > 0 ? true : false
        }
    }

    private removePresentRelations(unit: T): T {
        for (const relation of this.relationFields) {
            unit[relation] = [];
        }
        return unit;
    }
}