import { HttpServer, INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { faker } from "@faker-js/faker";
import { existsSync } from "fs";
import { ConfigService } from "@nestjs/config";
import * as session from 'express-session';

import { CreateFilmDto } from "./create.dto";
import { RandomMockFilmsGenerator } from "./mock.random.film.generator";
import { AppModule } from "../../../app.module";
import { Film } from "./films.entity";
import { CreateUnitDto } from "../config/dto/ create.unit.dto";
import { sessionConfig } from "../../../common/session/config";

jest.setTimeout(50000);

describe(`/film`, () => {
    let app: INestApplication;
    const randomFilmGenerator: RandomMockFilmsGenerator = new RandomMockFilmsGenerator();
    let server: HttpServer;
    let agent: request.SuperAgentTest;
    let configService: ConfigService;
    let FILES_STORAGE_TYPE: string;
    let IMAGES_RELATIVE_FILE_PATH: string;
    let ADMIN_USER_LOGIN: string;
    let ADMIN_USER_PASSWORD: string; 

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(key => {
                            switch (key) {
                                case `TEST_IMAGE_PATH`: return `./test/test-files/sample.jpg`;
                                case `IMAGES_RELATIVE_FILE_PATH`: return `images`;
                                default: return undefined;
                            }
                        }),
                    },
                },
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(session(sessionConfig));
        await app.init();

        server = app.getHttpServer();
        agent = request.agent(server);
        
        configService = moduleFixture.get<ConfigService>(ConfigService);
        
        retreiveEnvConstants();
        await loginAdmin();
    })

    afterAll(async () => await app.close())

    describe("POST", () => {
        it('should return 201 and create a new film', async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            newFilmDto.characters = ["Luke Skywalker", "C-3PO"].sort();
            newFilmDto.planets = ["Yavin IV"].sort();
            newFilmDto.starships = ["Death Star"].sort();
            newFilmDto.vehicles = ["Sand Crawler"].sort();
            newFilmDto.species = ["Human"].sort();

            const createdFilm = (await postSingleUnitText(newFilmDto, 201)).created;

            expect(createdFilm.name).toEqual(newFilmDto.name);
            expect(createdFilm.episode_id).toEqual(newFilmDto.episode_id);
            expect(createdFilm.opening_crawl).toEqual(newFilmDto.opening_crawl);
            expect(createdFilm.director).toEqual(newFilmDto.director);
            expect(createdFilm.producer).toEqual(newFilmDto.producer);
            expect(createdFilm.release_date).toEqual(newFilmDto.release_date);
            expect(typeof createdFilm.id).toBe("number");
            expect(new Date(createdFilm.created)).toBeInstanceOf(Date);
            expect(new Date(createdFilm.edited)).toBeInstanceOf(Date);
            expect(createdFilm.characters.map(unit => unit.name).sort()).toEqual(newFilmDto.characters);
            expect(createdFilm.planets.map(unit => unit.name).sort()).toEqual(newFilmDto.planets);
            expect(createdFilm.starships.map(unit => unit.name).sort()).toEqual(newFilmDto.starships);
            expect(createdFilm.vehicles.map(unit => unit.name).sort()).toEqual(newFilmDto.vehicles);
            expect(createdFilm.species.map(unit => unit.name).sort()).toEqual(newFilmDto.species);
            expect(createdFilm.images.map(unit => unit.name).sort()).toEqual(newFilmDto.images);
        })

        it('should return 404 with message that not found units with names at all', async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            newFilmDto.characters = [`wrong name ${faker.random.word()}`];
            const parsedResponseText = await postSingleUnitText(newFilmDto, 404);

            expect(parsedResponseText["message"]).toEqual(`Units with names "${newFilmDto.characters[0]}" not found at all`);
            expect(parsedResponseText["error"]).toEqual(`Not Found`);
            expect(parsedResponseText["statusCode"]).toEqual(404);
        })

        it('should return 404 with message that some units with names ... not found', async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            newFilmDto.characters = [`Luke Skywalker`, `wrong name ${faker.random.word()}`];
            const parsedResponseText = await postSingleUnitText(newFilmDto, 404);

            expect(parsedResponseText["message"]).toEqual(`Some of units with names "${newFilmDto.characters[0]},${newFilmDto.characters[1]}" not found`);
            expect(parsedResponseText["error"]).toEqual(`Not Found`);
            expect(parsedResponseText["statusCode"]).toEqual(404);
        })

        it('should return 404 and with message that unit with name ... already exists in database', async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            newFilmDto.name = `A New Hope`;
            const parsedResponseText = await postSingleUnitText(newFilmDto, 400)

            expect(parsedResponseText["message"]).toEqual(`Unit with name "${newFilmDto.name}" already exists in database`);
            expect(parsedResponseText["error"]).toEqual(`Bad Request`);
            expect(parsedResponseText["statusCode"]).toEqual(400);
        })
    })

    describe("GET", () => {
        it('should return 200 and up to 10 films', async () => {
            const createdResponsesText = await Promise.all(
                randomFilmGenerator
                    .generateSeveralUnitsWithoutRelations(10)
                    .map(film => randomFilmGenerator.transformSingleUnitToCreateDto(film))
                    .map(async dto => await postSingleUnitText(dto, 201))
            );

            const sortedInsertedNames = createdResponsesText.map(text => text?.created?.name).sort();
            const sortedInsertedEpisodesIds = createdResponsesText.map(text => text?.episode_id).sort();
            const sortedInsertedReleaseDates = createdResponsesText.map(text => text?.release_date).sort();
            const sortedInsertedCharacters = createdResponsesText.map(text => text.character).sort();
            const sortedInsertedPlanets = createdResponsesText.map(text => text.planets).sort();
            const sortedInsertedSpecies = createdResponsesText.map(text => text.species).sort();
            const sortedInsertedStarships = createdResponsesText.map(text => text.starships).sort();
            const sortedInsertedVehicles = createdResponsesText.map(text => text.vehicles).sort();
            const sortedInsertedImages = createdResponsesText.map(text => text.images).sort();

            const parsedResponseText = await getPageText(1, 200);
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
                const text = await getPageText(queryValue, 400);

                expect(text.message).toEqual("Validation failed (numeric string is expected)");
                expect(text.error).toEqual("Bad Request");
            }
        })

        it('should return 400 and with message: "Page value incorrect"', async () => {
            const queryParamValues = [0, -1];
            for (const queryValue of queryParamValues) {
                const text = await getPageText(queryValue, 400)

                expect(text.message).toEqual("Page value incorrect");
                expect(text.error).toEqual("Bad Request");
            }
        })

        it('should return 200 and with empty array', async () => {
            const text = await getPageText(9999999999, 200)

            expect(text).toEqual({
                data: {
                    units: [],
                    hasNext: false,
                    hasPrev: true,
                }
            })
        })
    })

    describe("DELETE", () => {
        it('should return 200 and deleted unit name', async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            const insertedUnitName = (await postSingleUnitText(newFilmDto, 201)).created.name;
            const parsedDeleteResponseText = await deleteSingleUnitText(insertedUnitName, 200)

            const getResponseNamesForAbsenceCheck = (await getPageText(1, 200))
                .data
                .units
                .map(unit => unit.name);

            expect(parsedDeleteResponseText).toEqual({ deleted: { name: insertedUnitName } });
            expect(getResponseNamesForAbsenceCheck).not.toContainEqual(insertedUnitName);
        })

        it(`should return 404 with message: 'Film with name: "..." not found' because unit for deletion is absent`, async () => {
            const nameOfNotExistedUnit = "wrong name " + faker.random.word();
            const text = await deleteSingleUnitText(nameOfNotExistedUnit, 404);

            expect(text.message).toEqual(`Film with name: "${nameOfNotExistedUnit}" not found`)
            expect(text.error).toEqual(`Not Found`)
        })

        it(`should return 404 with message: 'Film with name: "..." not found' because unit with numeric name for deletion is absent`, async () => {
            const wrongNameValue = +faker.random.numeric(1);
            const text = await deleteSingleUnitText(wrongNameValue, 404);

            expect(text.message).toEqual(`Film with name: "${wrongNameValue}" not found`)
            expect(text.error).toEqual("Not Found")
        })

        it(`should return 404 with message: "Cannot DELETE /film/" because unit name for deletion is an empty string`, async () => {
            const wrongNameValue = "";
            const text = await deleteSingleUnitText(wrongNameValue, 404);

            expect(text.message).toEqual("Cannot DELETE /film/")
            expect(text.error).toEqual("Not Found")
        })
    })

    describe("PUT", () => {
        it(`should return 201 and object with "updated" field with updated unit`, async () => {
            const updates: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            const nameOfUnitToUpdate = `A New Hope`
            updates.name = nameOfUnitToUpdate;

            const text = await putSingleUnitText(updates, 200);
            const updated = text.updated;

            expect(Object.keys(text)).toContainEqual("updated");
            expect(updated.name).toEqual(nameOfUnitToUpdate);
            expect(updated.episode_id).toEqual(updates.episode_id);
            expect(updated.opening_crawl).toEqual(updates.opening_crawl);
            expect(updated.director).toEqual(updates.director);
            expect(updated.producer).toEqual(updates.producer);
            expect(updated.release_date).toEqual(updates.release_date);
            expect(updated.characters).toEqual(updates.characters);
            expect(updated.planets).toEqual(updates.planets);
            expect(updated.starships).toEqual(updates.starships);
            expect(updated.vehicles).toEqual(updates.vehicles);
            expect(updated.species).toEqual(updates.species);
            expect(updated.images).toEqual(updates.images);
        })

        it(`should return 404 with message 'Film with name: "..." not found'`, async () => {
            const updates: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();

            const text = await putSingleUnitText(updates, 404);

            expect(text.message).toEqual(`Film with name: "${updates.name}" not found`);
            expect(text.error).toEqual("Not Found");
        })

        it(`should return 400 with message 'Incorrect date value: '...' for column 'release_date'`, async () => {
            const updates: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            updates.name = `A New Hope`;
            updates.release_date = "ttt";

            const text = await putSingleUnitText(updates, 400);
            const message = JSON.parse(text.message);

            expect(message).toEqual("Incorrect date value: 'ttt' for column 'release_date' at row 1");
            expect(text.error).toEqual("Bad Request");
        })
    })

    describe("POST images for film", () => {
        it(`POST single image should return 201 and return uploaded images names array`, async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            const createdFilm = (await postSingleUnitText(newFilmDto, 201)).created;
            const unitName: string = createdFilm.name;

            const text = await postSingleImage(unitName, 201);
            const imagesNames: string[] = text?.executed;

            expect(imagesNames).toBeTruthy()
            expect(Object.keys(text)).toEqual(["executed"])
            expect(imagesNames.length).toEqual(1)
            expect(imagesNames[0]).toMatch("\.jpg")
            expect(typeof imagesNames[0]).toEqual("string");
            if (FILES_STORAGE_TYPE === "FS") {
                checkFSFilesPresence(imagesNames);
            } else if (FILES_STORAGE_TYPE === "AWS") {
                await checkAWSFilesPresence(imagesNames);
            }

            await removeSeveral(imagesNames);
        })

        it(`POST single image should return 404 with message "Unit for adding image record not found"`, async () => {
            const unitName: string = `wrong name ${faker.random.word()}`;

            const text = await postSingleImage(unitName, 404);

            expect(text.statusCode).toEqual(404);
            expect(text.message).toEqual("Unit for adding image record not found");
            expect(text.error).toEqual("Not Found");
        })

        it(`POST single image should return 400 with message: "Unexpected field"`, async () => {
            const newFilmDto: CreateFilmDto = randomFilmGenerator.generateOneDtoWithoutRelations();
            const createdFilm = (await postSingleUnitText(newFilmDto, 201)).created;
            const unitName: string = createdFilm.name;

            const text = await postSingleImageWithWrongData(unitName, 400, "filess");

            expect(text.statusCode).toEqual(400);
            expect(text.message).toEqual("Unexpected field");
            expect(text.error).toEqual("Bad Request");
        })
    })




    async function checkAWSFilesPresence(names: string[]) {
        await Promise.all(names.map(name => checkAWSSingleFilePresence(name)));
    }

    async function checkAWSSingleFilePresence(imageName: string) {
        let response;
        try {
            response = await agent
                .get("/files")
                .query({ imageName })
                .expect(200);
            expect(response).toBeDefined();
        } catch (error) {
            expect(response).toBeDefined();
        }
    }

    function checkFSFilesPresence(names: string[]) {
        for (const name of names) {
            checkFSSingleFilePresence(name);
        }
    }

    function checkFSSingleFilePresence(name: string) {
        const path = `./${IMAGES_RELATIVE_FILE_PATH}/${name}`;
        expect(existsSync(path)).toEqual(true);
    }

    async function removeSeveral(images: string[]) {
        await Promise.all(images.map(name => removeSingle(name)))
    }

    async function removeSingle(imageName: string) {
        await agent
            .delete("/files")
            .send({ imageName })
            .expect(200);
    }

    async function postSingleImage(unitName: string, expectedStatusCode: number) {
        const response: request.Response = await agent
            .post('/film/file')
            .set('Content-Type', 'multipart/form-data')
            .attach("files", "./test/test-files/sample.jpg")
            .query({ unitName })
            .expect(expectedStatusCode);
        return JSON.parse(response.text);
    }

    async function postSingleImageWithWrongData(unitName: string, expectedStatusCode: number, attachField: string) {
        const response: request.Response = await agent
            .post('/film/file')
            .set('Content-Type', 'multipart/form-data')
            .attach(attachField, "./test/test-files/sample.jpg")
            .query({ unitName })
            .expect(expectedStatusCode);
        return JSON.parse(response.text);
    }

    async function postSingleUnitText(valueToSend: Film | CreateFilmDto, expectedStatusCode: number) {
        const postResponse: request.Response = await agent
            .post('/film')
            .send(valueToSend)
            .expect(expectedStatusCode);
        return JSON.parse(postResponse.text);
    }

    async function deleteSingleUnitText(name: string | number, expectedStatusCode: number) {
        const deleteResponse: request.Response = await agent
            .delete(`/film/${name}`)
            .expect(expectedStatusCode);
        return JSON.parse(deleteResponse.text);
    }

    async function putSingleUnitText(body: Film | CreateUnitDto, expectedStatusCode: number) {
        const putResponse: request.Response = await agent
            .put(`/film`)
            .send(body)
            .expect(expectedStatusCode);
        return JSON.parse(putResponse.text);
    }

    async function getPageText(page: number | null | undefined | string, expectedStatusCode: number) {
        const getResponse: request.Response = await agent
            .get(`/film`)
            .query({ page })
            .expect(expectedStatusCode);
        return JSON.parse(getResponse.text);
    }

    async function loginAdmin() {
        await agent
            .post("/auth/login")
            .send({
                username: ADMIN_USER_LOGIN,
                password: ADMIN_USER_PASSWORD
            })
            .expect(201);
    }

    function retreiveEnvConstants() {
        FILES_STORAGE_TYPE = configService.get<string>(`FILES_STORAGE_TYPE`);
        IMAGES_RELATIVE_FILE_PATH = configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
        ADMIN_USER_LOGIN = configService.get<string>(`ADMIN_USER_LOGIN`);
        ADMIN_USER_PASSWORD = configService.get<string>(`ADMIN_USER_PASSWORD`);
    }
})