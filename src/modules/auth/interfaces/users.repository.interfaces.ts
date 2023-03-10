import { CredentialsDto } from "../dto/auth.dto";
import { Users } from "../entities/users.entity";

interface UsersRepository {
    findOneBy(username: string): Promise<Users>;
    insertOneUser(body: CredentialsDto): Promise<Users>;
    insertOneAdmin(username: string, password: string): Promise<Users>;
}

export interface IUsersMysqlRepository extends UsersRepository { }