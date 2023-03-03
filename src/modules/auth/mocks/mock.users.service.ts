import { UnauthorizedException } from "@nestjs/common";
import { Role } from "../entities/role.enum";
import { Users } from "../entities/users.entity";

export class MockUsersService {

    static mockUsers: Users[] = [
        {
            username: "Common user",
            password: "111",
            roles: Role.USER,
        },
        {
            username: "Admin user",
            password: "222",
            roles: Role.ADMIN,
        },
    ]

    findOneBy = jest.fn().mockImplementation(async (username: string) => {
        const foundUser = MockUsersService.mockUsers.find(user => user.username === username);
        if (foundUser) return foundUser;
        throw new UnauthorizedException("User with given username does not exists");
    })
}