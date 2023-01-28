import { Users } from "../entities/users.entity";

interface UsersRepository {
    findOneBy(username: string): Promise<Users>;
    insertOneUser(username: string, password: string): Promise<Users>;
    insertOneAdmin(username: string, password: string): Promise<Users>;
}

export interface IUsersMysqlRepository extends UsersRepository { }