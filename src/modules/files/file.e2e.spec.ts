import { HttpServer, INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as session from 'express-session';
import { AppModule } from "../../app.module";
import { sessionConfig } from "../../common/session/config";
import { CreateFilmDto } from "../crud/films/create.dto";
import { Films } from "../crud/films/films.entity";
import { RandomMockFilmsGenerator } from "../crud/films/mock.random.film.generator";
import { ConfigService } from "@nestjs/config";


describe(`/files`, () => {
    let app: INestApplication;
    let server: HttpServer;
    let agent: request.SuperAgentTest;
    let configService: ConfigService;
    let TEST_IMAGE_PATH: string;
    let ADMIN_USER_LOGIN: string;
    let ADMIN_USER_PASSWORD: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(key => {
                            switch (key) {
                                case 'ADMIN_USER_LOGIN': return 'admin123';
                                case 'ADMIN_USER_PASSWORD': return '123123';
                                default: return undefined;
                            }
                        }),
                    },
                },
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.use(session(sessionConfig));
        await app.init();

        server = app.getHttpServer();
        agent = request.agent(server);
        configService = moduleFixture.get<ConfigService>(ConfigService);
        TEST_IMAGE_PATH = configService.get<string>(`TEST_IMAGE_PATH`);
        ADMIN_USER_LOGIN = configService.get<string>(`ADMIN_USER_LOGIN`);
        ADMIN_USER_PASSWORD = configService.get<string>(`ADMIN_USER_PASSWORD`);

        await loginAdmin();
    })

    afterAll(async () => await app.close())

    describe(`Files paths e2e tests`, () => {
        describe(`GET`, () => {
            it(`should return 200 with image. It should be equal to recenlty created image and test image`, async () => {
                const unitName = (await getPageText(1, 200)).data.units[0].name;
                const imageName: string = (await postSingleImage(unitName, 201)).executed[0];

                const getImageResponse = await getImage(imageName, 'image/*', 200);
                
                const resBody: Buffer = getImageResponse.body;

                expect(resBody).toBeDefined();
                expect(resBody).toBeInstanceOf(Buffer);
                expect(resBody).toEqual(fs.readFileSync(TEST_IMAGE_PATH));

                await deleteImageFromAws(imageName, 200);
            })

            it(`should return 404 with message "Image in FS was not found"`, async () => {
                const wrongImageName: string = `${faker.random.word()}-${faker.random.word()}-${faker.random.word()}`;

                const getImageResponse = await getImage(wrongImageName, 'application/json; charset=utf-8', 404);
                const text = JSON.parse(getImageResponse.text);

                expect(text.message).toEqual("Image in FS was not found");
            })
        })

        describe(`DELETE`, () => {
            it(`should return 200 with object: { executed: true }`, async () => {
                const unitName = (await getPageText(1, 200)).data.units[0].name;
                const imageName = (await postSingleImage(unitName, 201)).executed[0];

                const resBody = await deleteImageFromAws(imageName, 200);

                expect(JSON.parse(resBody.text)).toEqual({ "executed": true });
            })

            it(`should return 200 and related entity unit has to loose image record`, async () => {
                const postedFilm = new RandomMockFilmsGenerator().generateOneDtoWithoutRelations();
                const postedFilmName = (await postSingleUnitText(postedFilm, 201)).created.name
                const postedImageName = (await postSingleImage(postedFilmName, 201)).executed[0];
                const unitImages = (await getPageText(1, 200)).data.units[0].images;
                expect(unitImages[0].name).toEqual(postedImageName);

                await deleteImageFromAws(postedImageName, 200);
                
                const unitAfterImageDeletion = (await getPageText(1, 200)).data.units[0];
                expect(unitAfterImageDeletion.name).toEqual(postedFilmName);
                expect(unitAfterImageDeletion.images).toEqual([]);
            })

            it(`should return 404 with message: "File for deletion not found"`, async () => {
                const wrongImageName: string = `${faker.random.word()}-${faker.random.word()}-${faker.random.word()}`;

                const resBody = await deleteImageFromAws(wrongImageName, 404);
                const text = JSON.parse(resBody.text);
                
                expect(text.message).toEqual("File for deletion not found");
            })
        })
    })




    async function getImage(imageName: string, contentType: string, expectedStatusCode: number) {
        return await agent
            .get(`/files`)
            .query({ imageName })
            .expect(expectedStatusCode)
            .expect('Content-Type', contentType);
    }

    async function deleteImageFromAws(imageName: string, expectedStatusCode: number) {
        return await agent
            .delete(`/files`)
            .send({ imageName })
            .expect(expectedStatusCode);
    }

    async function postSingleImage(unitName: string, expectedStatusCode: number) {
        const response: request.Response = await agent
            .post('/film/file')
            .set('Content-Type', 'multipart/form-data')
            .attach("files", configService.get<string>(`TEST_IMAGE_PATH`))
            .query({ unitName })
            .expect(expectedStatusCode);
        return JSON.parse(response.text);
    }

    async function postSingleUnitText(valueToSend: Films | CreateFilmDto, expectedStatusCode: number) {
        const postResponse: request.Response = await agent
            .post('/film')
            .send(valueToSend)
            .expect(expectedStatusCode);
        return JSON.parse(postResponse.text);
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
})