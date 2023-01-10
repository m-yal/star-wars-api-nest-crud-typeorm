import { User } from "../entities/user.entity";

export interface IUsersService {
    findOneBy(username: string): Promise<User>;
    insertOne(username: string, password: string): Promise<User>;
}