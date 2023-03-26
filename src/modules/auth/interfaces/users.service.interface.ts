import { CredentialsDto } from "../dto/auth.dto";

import { Users } from "../entities/users.entity";

export interface IUsersService {
    findOneBy(username: string): Promise<Users>;
    insertOneUser(body: CredentialsDto): Promise<Users>;
}