import { User } from "../entities/user.entity";

interface UsersRepository {
    findOneBy(username: string): Promise<User>;
    insertOne(username: string, password: string): Promise<User>;
}

export interface IUsersMysqlRepository extends UsersRepository { }