import { Injectable } from '@nestjs/common';
import { User } from './config/entities/user.entity';
import { IAuthService } from './config/interfaces/auth.interface';
import { UsersService } from './users.service';

@Injectable()
export class AuthService implements IAuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, password: string): Promise<string[] | null> {
        const user: User = await this.usersService.findOneBy(username);
        const roles: string[] = user.roles.split(",");
        if (user && user.password === password) {
            return roles;
        }
        return null;
    }
}