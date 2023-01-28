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
            throw new UnauthorizedException();
        }
    }

    async insertOneUser(username: string, password: string): Promise<Users> {
        try {
            return await this.repository.insertOneUser(username, password);
        } catch (error) {
            throw new BadRequestException("Username already exists!");
        }
    }

    async insertOneAdmin(username: string, password: string): Promise<Users> {
        try {
            return await this.repository.insertOneAdmin(username, password);
        } catch (error) {
            throw new BadRequestException("Username already exists!");
        }
    }
}