import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUsersMysqlRepository } from './interfaces/users.repository.interfaces';
import { IUsersService } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {

    constructor(@Inject("IUsersMysqlRepository")private readonly repository: IUsersMysqlRepository) {}

    async findOneBy(username: string): Promise<User> {
        try {
            return await this.repository.findOneBy(username);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async insertOne(username: string, password: string): Promise<User> {
        try {
            return await this.repository.insertOne(username, password);
        } catch (error) {
            throw new BadRequestException("Username already exists!");
        }
    }
}