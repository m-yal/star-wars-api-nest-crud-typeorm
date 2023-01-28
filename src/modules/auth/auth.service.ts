import { Inject, Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { IAuthService } from './interfaces/auth.controller.interface';
import { IUsersService } from './interfaces/users.service.interface';

@Injectable()
export class AuthService implements IAuthService {
    constructor(@Inject("IUsersService")private usersService: IUsersService) { }

    async validateUser(username: string, password: string): Promise<string[] | null> {
        const user: Users = await this.usersService.findOneBy(username);
        const roles: string[] = user.roles.split(",");
        if (user && user.password === password) {
            return roles;
        }
        return null;
    }
}