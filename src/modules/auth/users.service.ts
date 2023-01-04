import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersMysqlRepository } from './users.mysql.repository';

@Injectable()
export class UsersService {

    constructor(private readonly repository: UsersMysqlRepository) {}

    async findOne(username: string): Promise<any> {
        try {
            return await this.repository.findOneBy(username);
        } catch (error) {
            throw new ForbiddenException();
        }
    }

    async insertOne(username: string, password: string) {
        try {
            return await this.repository.insertOne(username, password);
        } catch (error) {
            throw new ForbiddenException("Username already exists!")
        }
    }
}
