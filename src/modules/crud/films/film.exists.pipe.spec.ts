import { faker } from "@faker-js/faker";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Films } from "./films.entity";
import { FilmExistsPipe } from "./films.exists.pipe";
import { FilmsService } from "./films.service";
import { RandomFilmGenerator } from "./random.film.generator";

const mockFilms = RandomFilmGenerator.generateSeveral(+faker.random.numeric(2));

describe("Films exists pipe", () => {
    let service;
    let module: TestingModule;
    let pipe;

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
        const film: Films = mockFilms[0];

        const result: Films = await pipe.transform(film);

        expect(result).toEqual(film);
    })

    it("transform method should throw NotFoundException because of absence of film with given name", async () => {
        const film: Films = RandomFilmGenerator.generateOneWithoutRelatedUnits();
        film.name = `Wrong name ${faker.random.word}`;

        try {
            await pipe.transform(film);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException(`Film with name: "${film.name}" not found`));
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