import { Role } from "../entities/role.enum";
import { Users } from "../entities/users.entity";

export interface IAuthService {
    validateUser(username: string, password: string): Promise<Role | null>;
}

export interface IAuthController {
    login(req): Promise<void>;
    logout(req): Promise<void>;
    addUser(password: string, userName: string, req): Promise<Users>
}