import { faker } from "@faker-js/faker";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { Role } from "./entities/role.enum";
import { Users } from "./entities/users.entity";
import { UsersMysqlRepository } from "./users.mysql.repository";

describe("Users MySql repository", () => {
    let module: TestingModule;
    let repository: UsersMysqlRepository;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                UsersMysqlRepository,
                {
                    provide: getRepositoryToken(Users),
                    useClass: MockUsersRepository,
                }
            ],
        }).compile();

        repository = module.get<UsersMysqlRepository>(UsersMysqlRepository);
    });

    afterAll(async () => await module.close());

    it("to be defined", () => expect(repository).toBeDefined());

    it("findOneBy should return user", async () => {
        const username = MockUsersRepository.mockUsers[0].username;

        const result = await repository.findOneBy(username);

        expect(result).toEqual({
            username: username,
            password : MockUsersRepository.mockUsers[0].password,
            roles: MockUsersRepository.mockUsers[0].roles,
        });
    })

    it("findOneBy should throw UnauthorizedException", async () => {
        const username = `Wrong username ${faker.random.word()}`;

        try {
            await repository.findOneBy(username);
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException);
            expect(error).toEqual(new UnauthorizedException(`User with username "${username}" not found`))            
        }
    })

    it("insertOneUser should return user", async () => {
        const username = `newUserName${faker.random.word()}`;
        const password = `newPassword${faker.random.word()}`;
        
        const result = await repository.insertOneUser(username, password);

        expect(result).toEqual({
            username: username,
            password: password,
            roles: Role.USER,
        })
    })

    it("insertOneUser should throw BadRequestExcpetion", async () => {
        const username = MockUsersRepository.mockUsers[0].username;
        const password = "random password";
        
        try {
            await repository.insertOneUser(username, password);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error).toEqual(new BadRequestException(`User with username "${username}" already exists`));
        }
    })

    it("insertOneAdmin should return user", async () => {
        const username = `newUserName${faker.random.word()}`;
        const password = `newPassword${faker.random.word()}`;
        
        const result = await repository.insertOneAdmin(username, password);

        expect(result).toEqual({
            username: username,
            password: password,
            roles: Role.ADMIN,
        })
    })

    it("insertOneAdmin should throw BadRequestExcpetion", async () => {
        const username = MockUsersRepository.mockUsers[0].username;
        const password = "random password";
        
        try {
            await repository.insertOneAdmin(username, password);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error).toEqual(new BadRequestException(`User with username "${username}" already exists`));
        }
    })
})

class MockUsersRepository {

    static readonly mockUsers: Users[] = [
        {
            username: "Common user",
            password : "111",
            roles: Role.USER,
        },
        {
            username: "Admin user",
            password : "222",
            roles: Role.ADMIN,
        },
    ];

    findOneByOrFail = jest.fn().mockImplementation(async (usernameObj: { username: string }) => {
        const foundUser = MockUsersRepository.mockUsers.find(user => user.username === usernameObj.username);
        console.log("foundUser: " + JSON.stringify(foundUser));
        if (foundUser) return foundUser;
        throw new Error();
    })

    create = jest.fn().mockImplementation((inputData: { username: string, password: string, roles: Role }) => {
        const user = new Users();
        user.username = inputData.username;
        user.password = inputData.password;
        user.roles = inputData.roles;
        return user;
    })

    insert = jest.fn().mockImplementation(async (inputUser: Users) => {
        const alreadyExistst = MockUsersRepository.mockUsers.find(user => user.username === inputUser.username);
        if (alreadyExistst) {
            throw new Error();
        }
    });
}