import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entities/role.enum";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./interfaces/users.repository.interface";

@Injectable()
export class UsersMysqlRepository implements UsersRepository {

    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    async findOneBy(username: string): Promise<any> {
        return await this.repository.findOneByOrFail({ username });
    }

    async insertOne(username: string, password: string): Promise<any> {
        const newUser = this.repository.create({
            username: username,
            password: password,
            roles: [Role.USER, Role.ADMIN].join(",")
        });
        return await this.repository.insert(newUser);
    }
}