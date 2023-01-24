import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entities/role.enum";
import { User } from "./entities/user.entity";
import { IUsersMysqlRepository } from "./interfaces/users.repository.interfaces";

@Injectable()
export class UsersMysqlRepository implements IUsersMysqlRepository {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    async findOneBy(username: string): Promise<User> {
        try {
            return await this.repository.findOneByOrFail({ username });
        } catch (error) {
            throw new UnauthorizedException();            
        }
    }

    async insertOne(username: string, password: string): Promise<User> {
        const newUser: User = this.repository.create({
            username: username,
            password: password,
            roles: [Role.USER, Role.ADMIN].join(",")
        });
        await this.repository.insert(newUser);
        return newUser;
    }
}