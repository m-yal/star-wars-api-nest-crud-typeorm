import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user: User = await this.usersService.findOne(username);
        const roles = user.roles.split(",");
        if (user && user.password === password) {
            return roles;
        }
        return null;
    }
}
