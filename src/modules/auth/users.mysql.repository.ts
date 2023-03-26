import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CredentialsDto } from "./dto/auth.dto";
import { Role } from "./entities/role.enum";
import { Users } from "./entities/users.entity";
import { IUsersMysqlRepository } from "./interfaces/users.repository.interfaces";

@Injectable()
export class UsersMysqlRepository implements IUsersMysqlRepository {

    constructor(@InjectRepository(Users) private readonly repository: Repository<Users>) { }

    async findOneBy(username: string): Promise<Users> {
        try {
            return await this.repository.findOneByOrFail({ username });
        } catch (error) {
            throw new UnauthorizedException(`User with username "${username}" not found`);            
        }
    }

    async insertOneUser(body: CredentialsDto): Promise<Users> {
        return this.insertOne(body.username, body.password, Role.USER);
    }

    async insertOneAdmin(username: string, password: string): Promise<Users> {
        return this.insertOne(username, password, Role.ADMIN);
    }

    private async insertOne(username: string, password: string, role: Role): Promise<Users> {
        const newUser: Users = this.repository.create({
            username: username,
            password: password,
            roles: role
        });
        try {
            await this.repository.insert(newUser);
        } catch (error) {
            throw new BadRequestException(`User with username "${username}" already exists`);
        }
        return newUser;
    }
}