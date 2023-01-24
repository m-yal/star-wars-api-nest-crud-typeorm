import { ExecutedDto } from "src/modules/crud/config/dto/executed.dto";
import { NewUserDto } from "../dto/new-user.dto";

export interface IAuthService {
    validateUser(username: string, password: string): Promise<string[] | null>;
}

export interface IAuthController {
    login(req): Promise<ExecutedDto>;
    logout(req): Promise<ExecutedDto>;
    addUser(password: string, userName: string, req): Promise<NewUserDto>
}