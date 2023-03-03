import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); // config pass here
    }

    // here, in params can be more credentials
    async validate(username: string, password: string): Promise<any> {
        const userRole = await this.authService.validateUser(username, password);
        if (userRole) return userRole;
        throw new UnauthorizedException("Wrong password or username"); //this user is saved into session store - it is serialised
    }
}