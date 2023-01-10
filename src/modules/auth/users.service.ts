import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './config/entities/user.entity';
import { IUsersService } from './config/interfaces/users.interface';
import { UsersMysqlRepository } from './users.mysql.repository';

@Injectable()
export class UsersService implements IUsersService {

    constructor(private readonly repository: UsersMysqlRepository) {}

    async findOneBy(username: string): Promise<User> {
        return await this.repository.findOneBy(username);
    }

    async insertOne(username: string, password: string): Promise<User> {
        try {
            return await this.repository.insertOne(username, password);
        } catch (error) {
            throw new ForbiddenException("Username already exists!")
        }
    }
}