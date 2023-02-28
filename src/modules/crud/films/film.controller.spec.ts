import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Films } from "./films.entity";
import { FilmsService } from "./films.service";
import { faker } from '@faker-js/faker';
import { UpToTenUnitsPage } from "../../../common/types/types";
import { RandomMockFilmsGenerator } from "./mock.random.film.generator";
import { MockMulterFilesGenerator } from "../config/mocks/mock.multer.files.generator";
import { FilmsController } from "./films.controller";
import { PrepareFilmBodyPipe } from "./prepare-film-body.pipe";
import { PeopleService } from "../people/people.service";
import { PlanetsService } from "../planets/planets.service";
import { StarshipsService } from "../starships/startships.service";
import { SpeciesService } from "../species/species.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { plainToInstance } from "class-transformer";
import { CreateFilmDto } from "./create.dto";
import { MocksPair } from "../config/mocks/mock.pair";

const mocksPair: MocksPair<Films, CreateFilmDto> = new RandomMockFilmsGenerator().generateMocksPair(+faker.random.numeric(2));
const mockFilmsDtos: CreateFilmDto[] = mocksPair.getMockDtos();
const mockFilms: Films[] = mocksPair.getMockUnits();

describe('Films controller tests:', () => {
    let filmService: FilmsService;
    let controller: FilmsController;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [FilmsController],
            providers: providersForTestModule,
        }).compile();

        controller = module.get<FilmsController>(FilmsController);
        filmService = module.get<FilmsService>(FilmsService);
    })

    afterAll(async () => {
        await module.close();
    })

    it("controller shoud be defined", () => {
        expect(controller).toBeDefined();
    })

    it("create method accepts input dto", async () => {
        const dto: CreateFilmDto = JSON.parse(JSON.stringify(mockFilmsDtos[0]));
        dto.name = `new name ${faker.random.word()}`;
        const expectedResult: Films = plainToInstance(Films, { ...dto });

        const result: Films = await controller.create(dto);

        expect(result).toEqual(expectedResult);
    })

    it("create method should throw BadRequestException because unit already present in database", async () => {
        const generator = new RandomMockFilmsGenerator();
        const dto: CreateFilmDto = generator.transformSingleUnitToCreateDto(generator.generateOneWithRelatedUnits());
        dto.name = `Wrong name ${faker.random.word}`;
        
        try {
            await controller.create(dto);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error).toEqual(new BadRequestException(`Unit with name "${dto.name}" already exists in database`))     
        }
    })

    it("update method accepts input dto", async () => {
        const generator = new RandomMockFilmsGenerator();
        const dto: CreateFilmDto = generator.transformSingleUnitToCreateDto(generator.generateOneWithRelatedUnits());
        const expectedResult: Films = plainToInstance(Films, { ...dto });

        const result: Films = await controller.update(dto);

        expect(result).toEqual(expectedResult);
    })

    it("remove method accepts dto", async () => {
        const name: string = mockFilmsDtos[0].name;
        const expectedResult = { name };

        const result = await controller.remove(name);

        expect(result).toEqual(expectedResult);
    })

    it("remove method throws Not found exception", async () => {
        const name = `Wrong name ${faker.random.word}`;

        try {
            await controller.remove(name);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Unit for deletion with name "${name}" not found`));
        }
    })

    it("uploadImages returns array of filenames of input images", async () => {
        const images = MockMulterFilesGenerator.generateImages(+faker.random.numeric(1));
        mockFilms[0].images = [];

        const result = await controller.uploadImages(images, mockFilms[0].name);

        expect(result).toEqual(images.map(image => image.filename));
    })

    it("getPage returns first 10 units", async () => {
        const page: number = 1;

        const result = await controller.getPage(page);

        expect(result).toEqual({
            units: mockFilms.slice(0, 10),
            hasNext: true,
            hasPrev: false
        })
    })
})

class MockFilmService {
    create = jest.fn().mockImplementation(async (film: Films) => {
        const filmAlreadyExists = mockFilmsDtos.some(dto => dto.name === film.name);
        if (filmAlreadyExists) {
            throw new BadRequestException(`Unit with name "${film.name}" already exists in database`)
        }
        return film;
    });

    update = jest.fn().mockImplementation(async (film: Films) => film);

    delete = jest.fn().mockImplementation(async (name: string) => {
        const filmExists = mockFilmsDtos.some(dto => dto.name === name);
        if (filmExists) return { name };
        throw new NotFoundException(`Unit for deletion with name "${name}" not found`)
    });

    uploadImages = jest.fn().mockImplementation(async (files: Express.Multer.File[], unitName: string) => {
        return files.map(file => file.filename);
    });

    getUpToTen = jest.fn().mockImplementation(async (page: number): Promise<UpToTenUnitsPage<Films>> => {
        return {
            units: mockFilms.slice(0, 10),
            hasNext: true,
            hasPrev: false
        }
    })
}

const providersForTestModule = [
    {
        provide: FilmsService,
        useClass: MockFilmService,
    },
    {
        provide: PrepareFilmBodyPipe,
        useValue: {},
    },
    {
        provide: PeopleService,
        useValue: {},
    },
    {
        provide: PlanetsService,
        useValue: {},
    },
    {
        provide: StarshipsService,
        useValue: {},
    },
    {
        provide: SpeciesService,
        useValue: {},
    },
    {
        provide: VehiclesService,
        useValue: {},
    },
    {
        provide: "IFilesActions",
        useValue: {},
    }
]