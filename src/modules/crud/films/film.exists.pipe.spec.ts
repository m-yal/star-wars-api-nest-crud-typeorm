import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MocksPair } from "../config/mocks/mock.pair";
import { CreateFilmDto } from "./create.dto";
import { Films } from "./films.entity";
import { FilmExistsPipe } from "./films.exists.pipe";
import { FilmsService } from "./films.service";
import { RandomMockFilmsGenerator } from "./mock.random.film.generator";

const mocksPair: MocksPair<Films, CreateFilmDto> = new RandomMockFilmsGenerator().generateMocksPair(+faker.random.numeric(2));
const mockFilmsDtos: CreateFilmDto[] = mocksPair.getMockDtos();
const mockFilms: Films[] = mocksPair.getMockUnits();

describe("Films exists pipe", () => {
    let service: FilmsService;
    let module: TestingModule;
    let pipe: FilmExistsPipe;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                FilmExistsPipe,
                {
                    provide: FilmsService,
                    useClass: MockFilmsService,
                }
            ]
        }).compile();

        service = module.get<FilmsService>(FilmsService);
        pipe = module.get<FilmExistsPipe>(FilmExistsPipe);
    })

    afterAll(async () => {
        await module.close();
    })

    it("transform method pass input film because film with the same name is present in db", async () => {
        const dto: CreateFilmDto = mockFilmsDtos[0];

        const result: CreateFilmDto = await pipe.transform(dto);

        expect(result).toEqual(dto);
    })

    it("transform method should throw NotFoundException because of absence of film with given name", async () => {
        const dto = new RandomMockFilmsGenerator().generateOneWithRelatedUnits()
        dto.name = `Wrong name ${faker.random.word}`;

        try {
            await pipe.transform(dto);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Film with name: "${dto.name}" not found`));
        }
    })

    it("transform method should throw NotFoundException because of absence of film with given name data type", async () => {
        const film = { name: 1 };

        try {
            await pipe.transform(film);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Film with name: "${film.name}" not found`));
        }
    })
})

class MockFilmsService {
    exists = jest.fn().mockImplementation(async (inputFilmname: string) => {
        return mockFilms.some(film => film.name === inputFilmname)
    })
}