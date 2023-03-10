import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/auth.dto';
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

    async insertOneUser(body: CredentialsDto): Promise<Users> {
        return await this.repository.insertOneUser(body);
    }

    async insertOneAdmin(username: string, password: string): Promise<Users> {
        return await this.repository.insertOneAdmin(username, password);
    }
}