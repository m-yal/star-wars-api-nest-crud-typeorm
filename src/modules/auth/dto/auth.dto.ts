import { IsNotEmpty, IsString, Length } from "class-validator";

import { Role } from "../entities/role.enum";

export class NewUserDto {
    msg: 'User successfully registered';
    username: string;
    roles: Role;
}

export class CredentialsDto {

    @IsString()
    @Length(6, 20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @Length(6, 20)
    @IsNotEmpty()
    password: string;
}