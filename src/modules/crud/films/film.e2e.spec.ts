import { HttpServer, INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { CreateFilmDto } from "./create.dto";
import { RandomMockFilmsGenerator } from "./mock.random.film.generator";
import * as request from 'supertest';
import { AppModule } from "../../../app.module";
import { faker } from "@faker-js/faker";

describe(`/film`, () => {
    let app: INestApplication;
    const randomFilmGenerator: RandomMockFilmsGenerator = new RandomMockFilmsGenerator();
    let server: HttpServer;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        server = app.getHttpServer();
    })

    afterAll(async () => await app.close())

    it('should return 201 and create a new film', async () => {
        const newFilmDto: CreateFilmDto = randomFilmGenerator.transformSingleUnitToCreateDto(
            randomFilmGenerator.generateOneWithoutRelatedUnits()
        );
        const response: request.Response = await request(server)
            .post('/film')
            .send(newFilmDto)
            .expect(201);
        const parsedResponseText = JSON.parse(response.text);
        const createdFilm = parsedResponseText.created;

        expect(createdFilm.name).toEqual(newFilmDto.name);
        expect(createdFilm.episode_id).toEqual(newFilmDto.episode_id);
        expect(createdFilm.opening_crawl).toEqual(newFilmDto.opening_crawl);
        expect(createdFilm.director).toEqual(newFilmDto.director);
        expect(createdFilm.producer).toEqual(newFilmDto.producer);
        expect(createdFilm.release_date).toEqual(newFilmDto.release_date);
        expect(createdFilm.characters).toEqual(newFilmDto.planets);
        expect(createdFilm.starships).toEqual(newFilmDto.vehicles);
        expect(createdFilm.species).toEqual(newFilmDto.species);
        expect(createdFilm.images).toEqual(newFilmDto.images);
        expect(typeof createdFilm.id).toBe("number");
        expect(new Date(createdFilm.created)).toBeInstanceOf(Date);
        expect(new Date(createdFilm.edited)).toBeInstanceOf(Date);
        expect(response.header["x-powered-by"]).toEqual("Express");
        expect(response.header["content-type"]).toEqual("application/json; charset=utf-8");
        expect(response.header["connection"]).toEqual("close");
    })

    it('should return 404 with message that not found units with names at all', async () => {
        const newFilmDto: CreateFilmDto = randomFilmGenerator.transformSingleUnitToCreateDto(
            randomFilmGenerator.generateOneWithoutRelatedUnits()
        );
        newFilmDto.characters = [`wrong name ${faker.random.word()}`];
        const response: request.Response = await request(server)
            .post('/film')
            .send(newFilmDto)
            .expect(404);
        const parsedResponseText = JSON.parse(response.text);

        expect(parsedResponseText["message"]).toEqual(`Units with names "${newFilmDto.characters[0]}" not found at all`);
        expect(parsedResponseText["error"]).toEqual(`Not Found`);
        expect(parsedResponseText["statusCode"]).toEqual(404);
    })

    it('should return 404 with message that some units with names ... not found', async () => {
        const newFilmDto: CreateFilmDto = randomFilmGenerator.transformSingleUnitToCreateDto(
            randomFilmGenerator.generateOneWithoutRelatedUnits()
        );
        newFilmDto.characters = [`Luke Skywalker`, `wrong name ${faker.random.word()}`];
        const response: request.Response = await request(server)
            .post('/film')
            .send(newFilmDto)
            .expect(404);
        const parsedResponseText = JSON.parse(response.text);

        expect(parsedResponseText["message"]).toEqual(`Some of units with names "${newFilmDto.characters[0]},${newFilmDto.characters[1]}" not found`);
        expect(parsedResponseText["error"]).toEqual(`Not Found`);
        expect(parsedResponseText["statusCode"]).toEqual(404);
    })

    it('should return 404 and with message that unit with name ... already exists in database', async () => {
        const newFilmDto: CreateFilmDto = randomFilmGenerator.transformSingleUnitToCreateDto(
            randomFilmGenerator.generateOneWithoutRelatedUnits()
        );
        newFilmDto.name = `A New Hope`;
        const response: request.Response = await request(server)
            .post('/film')
            .send(newFilmDto)
            .expect(400);
        const parsedResponseText = JSON.parse(response.text);

        expect(parsedResponseText["message"]).toEqual(`Unit with name "${newFilmDto.name}" already exists in database`);
        expect(parsedResponseText["error"]).toEqual(`Bad Request`);
        expect(parsedResponseText["statusCode"]).toEqual(400);
    })

    it('should return 200 and up to 10 films', async () => {
        const createdResponses: request.Response[] = await Promise.all(
            randomFilmGenerator
                .generateSeveralUnitsWithoutRelations(10)
                .map(film => randomFilmGenerator.transformSingleUnitToCreateDto(film))
                .map(async dto => await request(server).post('/film').send(dto))
        );
        const createdResponsesText = createdResponses.map(res => JSON.parse(res.text));
        const sortedInsertedNames = createdResponsesText.map(text => text?.created?.name).sort();
        const sortedInsertedEpisodesIds = createdResponsesText.map(text => text?.episode_id).sort();
        const sortedInsertedReleaseDates = createdResponsesText.map(text => text?.release_date).sort();
        const sortedInsertedCharacters = createdResponsesText.map(text => text.character).sort();
        const sortedInsertedPlanets = createdResponsesText.map(text => text.planets).sort();
        const sortedInsertedSpecies = createdResponsesText.map(text => text.species).sort();
        const sortedInsertedStarships = createdResponsesText.map(text => text.starships).sort();
        const sortedInsertedVehicles = createdResponsesText.map(text => text.vehicles).sort();
        const sortedInsertedImages = createdResponsesText.map(text => text.images).sort();

        const response: request.Response = await request(server)
            .get('/film')
            .query({ page: 1 })
            .expect(200);
        
        const parsedResponseText = JSON.parse(response.text);
        const films = parsedResponseText.data.units;
        const sortedReceivedNames = films.map(film => film.name).sort(); 
        const sortedReceivedEpisodesIds = createdResponsesText.map(text => text.episode_id).sort();
        const sortedReceivedReleaseDates = createdResponsesText.map(text => text.release_date).sort();
        const sortedReceivedCharacters = createdResponsesText.map(text => text.character).sort();
        const sortedReceivedPlanets = createdResponsesText.map(text => text.planets).sort();
        const sortedReceivedSpecies = createdResponsesText.map(text => text.species).sort();
        const sortedReceivedStarships = createdResponsesText.map(text => text.starships).sort();
        const sortedReceivedVehicles = createdResponsesText.map(text => text.vehicles).sort();
        const sortedReceivedImages = createdResponsesText.map(text => text.images).sort();

        expect(sortedReceivedNames).toEqual(sortedInsertedNames);
        expect(sortedReceivedEpisodesIds).toEqual(sortedInsertedEpisodesIds);
        expect(sortedReceivedReleaseDates).toEqual(sortedInsertedReleaseDates);
        expect(new Date(films[0].created)).toBeInstanceOf(Date);
        expect(new Date(films[0].edited)).toBeInstanceOf(Date);
        expect(sortedReceivedCharacters).toEqual(sortedInsertedCharacters);
        expect(sortedReceivedPlanets).toEqual(sortedInsertedPlanets);
        expect(sortedReceivedSpecies).toEqual(sortedInsertedSpecies);
        expect(sortedReceivedStarships).toEqual(sortedInsertedStarships);
        expect(sortedReceivedVehicles).toEqual(sortedInsertedVehicles);
        expect(sortedReceivedImages).toEqual(sortedInsertedImages);
    })

    it('should return 400 and with message: "Validation failed (numeric string is expected)"', async () => {
        const queryParamValues = ["a", null, undefined, 1.1, "1.1", "1,1"];
        for (const queryValue of queryParamValues) {
            const response = await request(server)
                .get('/film')
                .query({ page: queryValue })
                .expect(400);
            const text = JSON.parse(response.text);

            expect(text.message).toEqual("Validation failed (numeric string is expected)");
            expect(text.error).toEqual("Bad Request");
        }
    })

    it('should return 400 and with message: "Page value is below or equals to 0"', async () => {
        const queryParamValues = [0, -1];
        for (const queryValue of queryParamValues) {
            const response = await request(server)
                .get('/film')
                .query({ page: queryValue })
                .expect(400);
            const text = JSON.parse(response.text);

            expect(text.message).toEqual("Page value is below or equals to 0");
            expect(text.error).toEqual("Bad Request");
        }
    })

    it('should return 400 and with message: "..."', async () => {
        const queryParamValues = [9999999999];
        for (const queryValue of queryParamValues) {
            const response = await request(server)
                .get('/film')
                .query({ page: queryValue })
                .expect(200);
            console.log(`response: ${JSON.stringify(response)}`);
            
            const text = JSON.parse(response.text);
            expect(text).toEqual({
                data: {
                    units: [],
                    hasNext: false,
                    hasPrev: false,
                }
            })
            // expect(text.message).toEqual("Page value is below or equals to 0");
            // expect(text.error).toEqual("Bad Request");
        }
    })
})