import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { FilesInjectionToken } from "../../files/injection.tokens";

import { MocksPair } from "../config/mocks/mock.pair";
import { PeopleService } from "../people/people.service";
import { PlanetsService } from "../planets/planets.service";
import { SpeciesService } from "../species/species.service";
import { StarshipsService } from "../starships/startships.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { CreateFilmDto } from "./create.dto";
import { Film } from "./films.entity";
import { RandomMockFilmsGenerator } from "./mock.random.film.generator";
import { PrepareFilmBodyPipe } from "./prepare.film.body.pipe";

jest.setTimeout(50000);

const mocksPair: MocksPair<Film, CreateFilmDto> = new RandomMockFilmsGenerator().generateMocksPair(+faker.random.numeric(2));
const mockFilmDto: CreateFilmDto = mocksPair.getMockDtos()[0];
const mockFilm: Film = mocksPair.getMockUnits()[0];

describe("Prepare film body pipe", () => {
    let pipe: PrepareFilmBodyPipe;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: prepareFilmUnitTestsProviders, 
        }).compile();

        pipe = module.get<PrepareFilmBodyPipe>(PrepareFilmBodyPipe);
    })

    afterAll(async () => {
        await module.close();
    })

    it("transform method returns Films based on CreateFilmDto with relations", async () => {
        const dto: CreateFilmDto = mockFilmDto;
        const expectedResult: Film = mockFilm;

        expect(await pipe.transform(dto)).toEqual(expectedResult);
    })
})

const prepareFilmUnitTestsProviders = [
    PrepareFilmBodyPipe,
    {
        provide: PeopleService,
        useValue: {
            findByNames: jest.fn().mockImplementation(async (names: string[]) => {
                return mockFilm.characters;
            })
        },
    },
    {
        provide: PlanetsService,
                            useValue: {
            findByNames: jest.fn().mockImplementation(async (names: string[]) => {
                return mockFilm.planets;
            })
        },
    },
    {
        provide: StarshipsService,
                            useValue: {
            findByNames: jest.fn().mockImplementation(async (names: string[]) => {
                return mockFilm.starships;
            })
        },
    },
    {
        provide: SpeciesService,
                            useValue: {
            findByNames:jest.fn().mockImplementation(async (names: string[]) => {
                return mockFilm.species;
            })
        },
    },
    {
        provide: VehiclesService,
                            useValue: {
            findByNames: jest.fn().mockImplementation(async (names: string[]) => {
                return mockFilm.vehicles;
            })
        },
    },
    {
        provide: FilesInjectionToken.FILES_ACTIONS,
        useValue: {
            findByNames: jest.fn().mockImplementation(async (names: string[]) => {
                return mockFilm.images;
            })
        },
    },
]