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
import { join } from "path";
import { RandomMockFilmsGenerator } from "../crud/films/mock.random.film.generator";
import { ConfigService } from "@nestjs/config";

describe(`/files`, () => {
    let app: INestApplication;
    let server: HttpServer;
    let agent: request.SuperAgentTest;
    let configService: ConfigService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(key => {
                        switch (key) {
                            case 'ADMIN_USER_LOGIN':
                            return 'admin123';
                            case 'ADMIN_USER_PASSWORD':
                            return '123123';
                            default:
                            return undefined;
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
        await loginAdmin();
    })

    afterAll(async () => await app.close())

    describe(`Files paths e2e tests`, () => {
        describe(`GET`, () => {
            it(`should return 200 with image. It should be equal to recenlty created image and test image`, async () => {
                const unitName = (await getPageText(1, 200)).data.units[0].name;
                const imageName = (await postSingleImage(unitName, 201)).executed[0];
                const imagesRelativeFilepath = configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`)

                const getImageResponse = await getImage({ imageName }, 'image/*', 200);
                const resBody = getImageResponse.body;

                expect(resBody).toBeDefined();
                expect(resBody).toBeInstanceOf(Buffer);
                expect(resBody).toEqual(fs.readFileSync(`./${imagesRelativeFilepath}/${imageName}`));
                expect(resBody).toEqual(fs.readFileSync(configService.get<string>(`TEST_IMAGE_PATH`)));
                deleteImageFromFS(imageName);
            })

            it(`should return 404 with message "Image in FS was not found"`, async () => {
                const wrongImageName: string = `${faker.random.word()}-${faker.random.word()}-${faker.random.word()}`;

                const getImageResponse = await getImage({ imageName: wrongImageName }, 'application/json; charset=utf-8', 404);
                const text = JSON.parse(getImageResponse.text);

                expect(text.message).toEqual("Image in FS was not found");
            })

            it(`should return 400 with messages: ["imageName should not be empty", "imageName must be a string"]`, async () => {
                const getImageResponse = await getImage({}, 'application/json; charset=utf-8', 400);

                const text = JSON.parse(getImageResponse.text);

                expect(text.message).toEqual(["imageName should not be empty", "imageName must be a string"]);
            })
        })

        describe(`DELETE`, () => {
            it(`should return 200 with object: { executed: true }`, async () => {
                const unitName = (await getPageText(1, 200)).data.units[0].name;
                const imageName = (await postSingleImage(unitName, 201)).executed[0];

                const resBody = await deleteImage(imageName, 200);

                expect(JSON.parse(resBody.text)).toEqual({ "executed": true });
            })

            it(`should return 200 and related entity unit has to loose image record`, async () => {
                const postedFilm = new RandomMockFilmsGenerator().generateOneDtoWithoutRelations();
                const postedFilmName = (await postSingleUnitText(postedFilm, 201)).created.name
                const postedImageName = (await postSingleImage(postedFilmName, 201)).executed[0];
                const unitImages = (await getPageText(1, 200)).data.units[0].images;
                expect(unitImages[0].name).toEqual(postedImageName);

                await deleteImage(postedImageName, 200);
                
                const unitAfterImageDeletion = (await getPageText(1, 200)).data.units[0];
                expect(unitAfterImageDeletion.name).toEqual(postedFilmName);
                expect(unitAfterImageDeletion.images).toEqual([]);
            })

            it(`should return 404 with message: "File for deletion not found"`, async () => {
                const wrongImageName: string = `${faker.random.word()}-${faker.random.word()}-${faker.random.word()}`;

                const resBody = await deleteImage(wrongImageName, 404);
                const text = JSON.parse(resBody.text);
                
                expect(text.message).toEqual("File for deletion not found");
            })

            it(`should return 404 with message: "File record not found"`, async () => {
                const notExistsingInDBImageName = "sample.jpg";
                const imageName = copyImage(notExistsingInDBImageName);

                const resBody = await deleteImage(imageName, 404);

                expect(JSON.parse(resBody.text).message).toEqual("File record not found");
                deleteImageFromFS(notExistsingInDBImageName);
            })
        })
    })



    async function getImage(body: object, contentType: string, expectedStatusCode: number) {
        return await agent
            .get(`/files`)
            .send(body)
            .expect(expectedStatusCode)
            .expect('Content-Type', contentType);
    }

    async function deleteImage(imageName: string, expectedStatusCode: number) {
        return await agent
            .delete(`/files`)
            .send({ imageName })
            .expect(expectedStatusCode);
    }

    function copyImage(destFileName: string) {
        const sourceImage = join(configService.get<string>(`TEST_IMAGE_PATH`));
        const destinationImage = join(configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`), destFileName)

        const readStream = fs.createReadStream(sourceImage);
        const writeStream = fs.createWriteStream(destinationImage);
        readStream.pipe(writeStream);

        return destFileName;
    }

    function deleteImageFromFS(imageName: string) {
        const path: fs.PathLike = join(configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`), imageName);
        fs.unlinkSync(path);
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
                username: configService.get<string>(`ADMIN_USER_LOGIN`),
                password: configService.get<string>(`ADMIN_USER_PASSWORD`)
            })
            .expect(201);
    }
})