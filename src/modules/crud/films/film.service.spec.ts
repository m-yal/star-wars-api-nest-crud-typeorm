import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { faker } from '@faker-js/faker';

import { FILMS_RELATIONS_FIELDS } from "../config/relations.fields";
import { Films } from "./films.entity";
import { FilmsService } from "./films.service";
import { Files } from "../../files/entities/file.entity";
import { UpToTenUnitsPage } from "../../../common/types/types";
import { TEN_UNITS_PER_PAGE } from "../config/constants";
import { RandomMockFilmsGenerator } from "./mock.random.film.generator";
import { MocksPair } from "../config/mocks/mock.pair";
import { CreateFilmDto } from "./create.dto";
import { MockMulterFilesGenerator } from "../config/mocks/mock.multer.files.generator";

jest.setTimeout(50000);

const mockFilmsPairs: MocksPair<Films, CreateFilmDto> = new RandomMockFilmsGenerator().generateMocksPair(+faker.random.numeric(2));
const mockCreateDtos: CreateFilmDto[] = mockFilmsPairs.getMockDtos();
const mockFilms: Films[] = mockFilmsPairs.getMockUnits();

describe('Films service tests', () => {
    let service: FilmsService;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                FilmsService,
                {
                    provide: getRepositoryToken(Films),
                    useClass: MockFilmsRepository,
                },
                {
                    provide: getRepositoryToken(Files),
                    useClass: MockFilesRepository,
                },
                {
                    provide: "IFilesActions",
                    useClass: MockFilesService,
                },
            ]
        }).compile();

        service = module.get<FilmsService>(FilmsService);
    })

    afterAll(async () => {
        await module.close();
    })

    it("shoud be defined", () => {
        expect(service).toBeDefined();
    })

    it("relation fields set correctly", () => {
        expect(service.relationFields).toEqual(FILMS_RELATIONS_FIELDS);
    })

    it("exists method should return true", async () => {
        const filmName: string = mockFilms[0].name;

        const result: boolean = await service.exists(filmName);

        expect(result).toBe(true);
    })

    it("exists method should return false", async () => {
        const filmName: string = `Wrong name ${faker.random.word()}`;

        const result: boolean = await service.exists(filmName);

        expect(result).toBe(false);
    })

    it("findByNames should return all expected films", async () => {
        const filmsNames: string[] = [mockFilms[0].name, mockFilms[1].name];

        const result: Films[] = await service.findByNames(filmsNames);

        expect(result).toEqual([mockFilms[0], mockFilms[1]]);
    })

    it("findByNames should return expected single film", async () => {
        const filmsNames: string[] = [mockFilms[1].name];

        const result: Films[] = await service.findByNames(filmsNames);        

        expect(result).toEqual([mockFilms[1]]);
    })

    it("findByNames should throw and excpetion with message that found 0 values", async () => {
        const filmsNames: string[] = [`Wrong name ${faker.random.word()}`];

        try {
            await service.findByNames(filmsNames);        
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Units with names "${filmsNames}" not found at all`));
        }
    })

    it("findByNames should throw and excpetion with message that some of the values was not found", async () => {
        const filmsNames: string[] = ["Wrong name", mockFilms[0].name];
        
        try {
            await service.findByNames(filmsNames);        
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Some of units with names "${filmsNames}" not found`));
        }
    })

    it("findByNames should return empty array", async () => {
        const filmsNames: string[] = [];

        const result: Films[] = await service.findByNames(filmsNames);        

        expect(result).toEqual([]);
    })

    it("create method should return created film", async () => {
        const film: Films = new RandomMockFilmsGenerator().generateOneWithoutRelatedUnits();

        const result: Films = await service.create(film);

        expect(result).toEqual(film);
    })

    it("findOne should return one film found by name", async () => {
        const filmToFind = mockFilms[0];
        const nameOfFilmToFind = filmToFind.name;
        
        const result = await service.findOne(nameOfFilmToFind);

        expect(result).toEqual(filmToFind);
    })

    it("findOne should throw exception because of wrong input name", async () => {
        const filmToFind = JSON.parse(JSON.stringify(mockFilms[0]));
        filmToFind.name = "WrongName123";
        const nameOfFilmToFind = filmToFind.name;
        
        try {
            await service.findOne(nameOfFilmToFind);       
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Unit with name ${nameOfFilmToFind} not found`));
        }
    })

    it("update method update entity", async () => {
        const newDirectorName = "New director name";
        const updates: DeepPartial<Films> = {
            name: mockFilms[0].name,
            director: newDirectorName
        };

        const result = await service.update(plainToInstance(Films, updates));

        expect(result.director).toEqual(newDirectorName);
    })

    it("delete method returned object with deleted unit name", async () => {
        const deletionUnitName = mockFilms[0].name;

        expect(await service.delete(deletionUnitName)).toEqual({ name: deletionUnitName });
    })


    it("getUpToTen should return 10 units", async () => {
        const pagesAmount = Math.ceil(mockFilms.length / TEN_UNITS_PER_PAGE);
        const pagesNumbersArray = [];
        for (let i = 1; i <= pagesAmount; i++) pagesNumbersArray.push(i);
        for await (const page of pagesNumbersArray) {
            const startIndex = (page - 1) * TEN_UNITS_PER_PAGE;
            const endIndex = startIndex + TEN_UNITS_PER_PAGE;
            const upToTenUnits: UpToTenUnitsPage<Films> = await service.getUpToTen(page);
            expect(upToTenUnits.units).toEqual(mockFilms.slice(startIndex, endIndex));
            expect(upToTenUnits.hasNext).toEqual(page < pagesAmount);
            expect(upToTenUnits.hasPrev).toEqual(startIndex > 0);
        }
    })

    it("uploadImages should return filenames of input files", async () => {
        const unitName = mockFilms[0].name;
        const images = MockMulterFilesGenerator.generateImages(5);

        const result: string[] = await service.uploadImages(images, unitName);

        expect(result).toEqual(images.map(image => image.filename));
    })

    it("uploadImages with wrong input unitName should throw NotFoundException", async () => {
        const unitName = `wrong name ${faker.random.word}`;
        const images = MockMulterFilesGenerator.generateImages(5);

        try {
            await service.uploadImages(images, unitName);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException("Unit for adding image record not found"))
        }
    })
})

class MockFilesService {
    upload = jest.fn().mockImplementation(async (files: Express.Multer.File[]) => {
        return files.map(file => file.filename);
    })
}

class MockFilesRepository extends Repository<Files> {
    create = jest.fn().mockImplementation(file => file);

    save = jest.fn().mockImplementation(async (files: Express.Multer.File[]) => files);
}


class MockFilmsRepository extends Repository<Films> {

    films: Films[] = mockFilms;

    findOne = jest.fn(async (findOneOptions: FindOneOptions): Promise<Films> => {
        const name = findOneOptions.where["name"];
        const foundFilm = this.films.find(film => film.name === name);
        return foundFilm;
    })

    findBy = jest.fn(async (findByNameOptions: FindOptionsWhere<Films>) => {
        const names = findByNameOptions.name["_value"];
        const promises = names.map(async name => {
            return this.findOne({ where: { name } });  
        });
        return await Promise.all(promises);
    })

    save = jest.fn().mockImplementation(async (film: Films) => film);
    
    create = jest.fn().mockImplementation(async (film: Films) => film);

    count = jest.fn().mockImplementation(async () => {
        return this.films.length;
    });

    findOneOrFail = jest.fn().mockImplementation(async (findOneOptions: FindOneOptions) => {
        const film = await this.findOne(findOneOptions);
        if (film) return film;
        throw new Error();
    })

    merge = jest.fn().mockImplementation((mergeIntoEntity, updates): Films => {
        const mergedFilm = new Films();
        for (const key in mergeIntoEntity) {
            mergedFilm[key] = mergeIntoEntity[key];
        }
        for (const key in updates) {
            mergedFilm[key] = updates[key];
        }
        return mergedFilm;
    })

    remove = jest.fn().mockImplementation(async (name: string) => { name });

    find = jest.fn().mockImplementation(async (findManyOptions: FindManyOptions<Films>) => {
        const filmsToTake = findManyOptions.take;
        const skip = findManyOptions.skip;
        const mockSlice = mockFilms.slice(skip, skip + filmsToTake);
        return mockSlice;
    })
}