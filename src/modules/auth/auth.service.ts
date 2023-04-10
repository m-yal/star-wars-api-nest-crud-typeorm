import { Inject, Injectable } from '@nestjs/common';

import { Role } from './entities/role.enum';
import { Users } from './entities/users.entity';
import { AuthInjectionToken } from './injection.tokens';
import { IAuthService } from './interfaces/auth.controller.interfaces';
import { IUsersService } from './interfaces/users.service.interface';

@Injectable()
export class AuthService implements IAuthService {

    constructor(@Inject(AuthInjectionToken.USERS_SERVICE) private usersService: IUsersService) { }

    async validateUser(username: string, password: string): Promise<Role | null> {
        try {
            const user: Users = await this.usersService.findOneBy(username);
            if (user && user.password === password) return user.roles;
        } catch (error) {
            return null;
        }
    }
}