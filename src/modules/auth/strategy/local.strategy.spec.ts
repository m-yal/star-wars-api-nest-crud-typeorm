import { faker } from "@faker-js/faker";
import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "../auth.service";
import { Role } from "../entities/role.enum";
import { Users } from "../entities/users.entity";
import { LocalStrategy } from "./local.strategy";

describe("Local strategy", () => {
    let module: TestingModule;
    let strategy: LocalStrategy;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                LocalStrategy,
                {
                    provide: AuthService,
                    useClass: MockAuthService,
                },
            ],
        }).compile();

        strategy = module.get<LocalStrategy>(LocalStrategy);
    })

    afterAll(async () => await module.close());

    it("validate method returns user", async () => {
        const username = MockAuthService.mockUsers[0].username;
        const password = MockAuthService.mockUsers[0].password;
        const expectedResult = MockAuthService.mockUsers[0].roles;

        const result = await strategy.validate(username, password);

        expect(result).toEqual(expectedResult);
    })

    it("validate method throws UnauthorizedException", async () => {
        const username = `wrong name ${faker.random.word()}`;
        const password = `wrong password ${faker.random.word()}`;

        try {
            await strategy.validate(username, password);
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException);
            expect(error).toEqual(new UnauthorizedException("Wrong password or username"));
        }
    })
})

class MockAuthService {

    static mockUsers: Users[] = [
        {
            username: "common user",
            password: "111",
            roles: Role.USER
        },
        {
            username: "admin user",
            password: "222",
            roles: Role.ADMIN
        },
    ]
    validateUser = jest.fn().mockImplementation(async (username: string, password: string): Promise<Role | null> => {
        const user = MockAuthService.mockUsers.find(user => user.username === username);
        if (user?.password === password) return user.roles;
        return null;
    })
}