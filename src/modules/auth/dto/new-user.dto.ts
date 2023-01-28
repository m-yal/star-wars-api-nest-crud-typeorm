import { Role } from "../entities/role.enum";

export class NewUserDto {
    msg: 'User successfully registered';
    userName: string;
    roles: Role;
}