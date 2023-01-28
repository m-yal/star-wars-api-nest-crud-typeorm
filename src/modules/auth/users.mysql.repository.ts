import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
            throw new UnauthorizedException();            
        }
    }

    async insertOneUser(username: string, password: string): Promise<Users> {
        const newUser: Users = this.repository.create({
            username: username,
            password: password,
            roles: Role.USER
        });
        await this.repository.save(newUser);
        return newUser;
    }

    async insertOneAdmin(username: string, password: string): Promise<Users> {
        const newUser: Users = this.repository.create({
            username: username,
            password: password,
            roles: Role.ADMIN
        });
        await this.repository.save(newUser);
        return newUser;
    }
}