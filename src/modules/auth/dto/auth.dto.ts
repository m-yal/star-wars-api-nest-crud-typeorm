import { IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "../entities/role.enum";

export class NewUserDto {
    msg: 'User successfully registered';
    username: string;
    roles: Role;
}

export class CredentialsDto {

    @IsString()
    @Length(6)
    @IsNotEmpty()
    username: string;

    @IsString()
    @Length(6)
    @IsNotEmpty()
    password: string;
}