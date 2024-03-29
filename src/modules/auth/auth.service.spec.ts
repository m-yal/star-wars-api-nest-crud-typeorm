import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { AuthInjectionToken } from "./injection.tokens";
import { MockUsersService } from "./mocks/mock.users.service";

jest.setTimeout(50000);

describe("Auth service", () => {
    let module: TestingModule;
    let service: AuthService;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: AuthInjectionToken.USERS_SERVICE,
                    useClass: MockUsersService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    })

    afterAll(async () => await module.close())

    it("validateUser should return roles of user with given input username", async () => {
        const mockUser = MockUsersService.mockUsers[0];
        const username = mockUser.username;
        const password = mockUser.password;

        const result = await service.validateUser(username, password);

        expect(result).toEqual(mockUser.roles);
    })

    it("validateUser should return null", async () => {
        const username = `wrong username ${faker.random.word()}`;
        const password = `wrong password ${faker.random.word()}`;

        const result = await service.validateUser(username, password);

        expect(result).toEqual(null);
    })
})