import { Users } from "../entities/users.entity";

export interface IUsersService {
    findOneBy(username: string): Promise<Users>;
    insertOneUser(username: string, password: string): Promise<Users>;
}