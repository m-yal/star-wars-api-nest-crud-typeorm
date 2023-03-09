import { HttpServer, INestApplication, NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import { config } from "dotenv";
import { AppModule } from "../../app.module";
import { CreateUnitDto } from "../crud/config/dto/ create.unit.dto";
import { CreateFilmDto } from "../crud/films/create.dto";
import { Films } from "../crud/films/films.entity";
import { sessionConfig } from "../../common/session/config";
import * as session from 'express-session';
import { RandomMockFilmsGenerator } from "../crud/films/mock.random.film.generator";

config();

describe(`/film`, () => {
    let app: INestApplication;
    let server: HttpServer;
    let agent: request.SuperAgentTest;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(session(sessionConfig));
        await app.init();
        server = app.getHttpServer();
        agent = request.agent(server);
    })

    afterAll(async () => await app.close())

    describe("Correct required constants of .env file presence", () => {
        const names: string[] = [
            "SESSION_COOKIES_MAX_AGE",
            "SESSION_SECRET",
            "ADMIN_USER_LOGIN",
            "ADMIN_USER_PASSWORD",
        ]
        for (const name of names) {
            it(`${name} is not empty`, () => {
                expect(process.env[name]).toBeTruthy()
            })
        }
        it("SESSION_COOKIES_MAX_AGE is integer number", () => {
            expect(Number.isInteger(+process.env.SESSION_COOKIES_MAX_AGE)).toEqual(true);
        })
        it("SESSION_COOKIES_MAX_AGE is above zero", () => {
            expect(+process.env.SESSION_COOKIES_MAX_AGE > 0).toEqual(true);
        })
    })

    describe("POST login", () => {
        it(`should return 201 and set session "sid" cookie`, async () => {
            const body = generateCredentials();
            await register(body, 201);
            await agent.get(`/film`).query({ page: 1 }).expect(403);

            const response = await login(body, 201);

            await agent.get(`/film`).query({ page: 1 }).expect(200);
            expect(response.header["set-cookie"][0]).toMatch("connect\.sid=");
            expect(JSON.parse(response.text)).toEqual({ executed: true });
        })

        it(`should return 201 for 2 login responses and "sid" cookie should be different`, async () => {
            const body = generateCredentials();
            await register(body, 201);
            await login(body, 201);

            const firstResponse = await login(body, 201);
            const firstResponseCookie = firstResponse.header["set-cookie"][0];
            expect(JSON.parse(firstResponse.text)).toEqual({ executed: true });
            await agent.get(`/film`).query({ page: 1 }).expect(200);

            const secondResponse = await login(body, 201);
            const secondResponseCookie = secondResponse.header["set-cookie"][0];
            expect(secondResponseCookie).not.toEqual(firstResponseCookie);
            await agent.get(`/film`).query({ page: 1 }).expect(200);
        })

        it(`should return 403 with message: "Wrong password or username"`, async () => {
            const body = generateCredentials();

            const response = await login(body, 403);
            const text = JSON.parse(response.text);

            expect(text.message).toEqual("Wrong password or username");
            expect(text.error).toEqual("Forbidden");
        })

        it(`should return 400 with message: "Wrong input body format. It has to be: { username: '...', password: '...'}". Because sent object only with 'username'`, async () => {
            const body = {
                username: process.env.ADMIN_USER_LOGIN,
            };

            const response = await login(body, 400);
            const text = JSON.parse(response.text);

            expect(text.message).toEqual("'password' field is absenct in body");
        })

        it(`should return 400 with message: "Empty body object recived". Because no object in body sent"`, async () => {
            const response = await login({}, 400);
            const text = JSON.parse(response.text);

            expect(text.message).toEqual("Empty body object recived");
            expect(text.error).toEqual("Bad Request");
        })
    })

    describe("GET logout", () => {
        it("should return 200 during logout and 403 during GET of films page", async () => {
            const body = generateCredentials();
            await register(body, 201);
            await login(body, 201);
            await agent.get(`/film`).query({ page: 1 }).expect(200);

            await logout(200);

            await agent.get(`/film`).query({ page: 1 }).expect(403);
        })

        it("should return 200 during 2 logouts and 403 during GET of films page", async () => {
            const body = generateCredentials();
            await register(body, 201);
            await login(body, 201);
            await agent.get(`/film`).query({ page: 1 }).expect(200);

            await logout(200);
            await agent.get(`/film`).query({ page: 1 }).expect(403);

            await logout(200);
            await agent.get(`/film`).query({ page: 1 }).expect(403);
        })
    })

    describe("POST register", () => {
        it(`should return 201 with message "User successfully registered" and username and role. Cookies should be cleaned`, async () => {
            await login({ username: process.env.ADMIN_USER_LOGIN, password: process.env.ADMIN_USER_PASSWORD }, 201);
            const body = generateCredentials();

            const registerResponse = await register(body, 201);
            const text = JSON.parse(registerResponse.text);

            expect(text.msg).toEqual("User successfully registered");
            expect(text.username).toEqual(body.username);
            expect(text.roles).toEqual("user");
            expect(registerResponse.header["set-cookie"]).toBeUndefined();
        })

        it(`should return 400 with message "User with username "..." already exists"`, async () => {
            const body = generateCredentials();
            await register(body, 201);

            const registerResponse = await register(body, 400);
            const text = JSON.parse(registerResponse.text);

            expect(text.message).toEqual(`User with username "${body.username}" already exists`);
            expect(text.error).toEqual(`Bad Request`);
            expect(text.statusCode).toEqual(400);
        })

        it(`should return 400 with message "Password field is empty"`, async () => {
            const body = generateCredentials();
            body.password = "";

            const registerResponse = await register(body, 400);
            const text = JSON.parse(registerResponse.text);

            expect(text.message).toEqual(`Password field is empty`);
            expect(text.error).toEqual(`Bad Request`);
            expect(text.statusCode).toEqual(400);
        })
    })

    describe(`Roles access testing: Films units`, () => {
        it(`"Users" allowed operations`, async () => {
            const userBody = generateCredentials();
            await register(userBody, 201);

            await login(userBody, 201);

            await getPageResponse(1, 200);
        })

        it(`"Users" forbidden operations`, async () => {
            const userBody = generateCredentials();
            await register(userBody, 201);
            const filmDto = new RandomMockFilmsGenerator().generateOneDtoWithoutRelations();

            await login(userBody, 201);

            await deleteSingleFilm(`${faker.random.word()}`, 403);
            await postSingleFilm(filmDto, 403);
            await putSingleFilm(filmDto, 403);
        })

        it(`"Admin" allowed operations`, async () => {
            await login({ username: process.env.ADMIN_USER_LOGIN, password: process.env.ADMIN_USER_PASSWORD }, 201);
            const filmDto = new RandomMockFilmsGenerator().generateOneDtoWithoutRelations();

            await getPageResponse(1, 200);
            await postSingleFilm(filmDto, 201);
            await putSingleFilm(filmDto, 200);
            await deleteSingleFilm(filmDto.name, 200);
        })
    })




    async function register(body: object, expectedStatusCode: number) {
        return await agent
            .post(`/auth/register`)
            .send(body)
            .expect(expectedStatusCode);
    }

    async function logout(expectedStatusCode: number) {
        return await agent
            .get("/auth/logout")
            .expect(expectedStatusCode);
    }

    async function login(body: object, expectedStatusCode: number) {
        return await agent
            .post("/auth/login")
            .send(body)
            .expect(expectedStatusCode)
    }

    async function postSingleFilm(valueToSend: Films | CreateFilmDto, expectedStatusCode: number) {
        return await agent
            .post('/film')
            .send(valueToSend)
            .expect(expectedStatusCode);
    }

    async function deleteSingleFilm(name: string | number, expectedStatusCode: number) {
        return await agent
            .delete(`/film/${name}`)
            .expect(expectedStatusCode);
    }

    async function putSingleFilm(body: Films | CreateUnitDto, expectedStatusCode: number) {
        return await agent
            .put(`/film`)
            .send(body)
            .expect(expectedStatusCode);
    }

    async function getPageResponse(page: number | null | undefined | string, expectedStatusCode: number) {
        return await agent
            .get(`/film`)
            .query({ page })
            .expect(expectedStatusCode);
    }

    function generateCredentials() {
        return {
            username: `${faker.random.word()}_username_${faker.random.word()}`,
            password: `${faker.random.word()}_password_${faker.random.word()}`
        };
    }
})