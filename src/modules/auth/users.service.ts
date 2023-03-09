import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { IUsersMysqlRepository } from './interfaces/users.repository.interfaces';
import { IUsersService } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {

    constructor(@Inject("IUsersMysqlRepository")private readonly repository: IUsersMysqlRepository) {}

    async findOneBy(username: string): Promise<Users> {
        try {
            return await this.repository.findOneBy(username);
        } catch (error) {
            throw new UnauthorizedException("User with given username does not exists");
        }
    }

    async insertOneUser(username: string, password: string): Promise<Users> {
        return await this.repository.insertOneUser(username, password);
    }

    async insertOneAdmin(username: string, password: string): Promise<Users> {
        return await this.repository.insertOneAdmin(username, password);
    }
}