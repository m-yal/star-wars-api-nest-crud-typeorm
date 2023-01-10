import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./config/entities/role.enum";
import { User } from "./config/entities/user.entity";

@Injectable()
export class UsersMysqlRepository {
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