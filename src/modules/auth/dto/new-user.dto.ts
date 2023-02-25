import { Role } from "../entities/role.enum";

export class NewUserDto {
    msg: 'User successfully registered';
    username: string;
    roles: Role;
}