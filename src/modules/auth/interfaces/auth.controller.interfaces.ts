import { CredentialsDto } from "../dto/auth.dto";
import { Role } from "../entities/role.enum";
import { Users } from "../entities/users.entity";

export interface IAuthService {
    validateUser(username: string, password: string): Promise<Role | null>;
}

export interface IAuthController {
    login(req): Promise<true>;
    logout(req): Promise<true>;
    addUser(body: CredentialsDto, req): Promise<Users>
}