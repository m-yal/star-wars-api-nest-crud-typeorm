import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

import { NewUserDto } from "../dto/auth.dto";
import { Users } from "../entities/users.entity";

@Injectable()
export class RegisteredInterceptor implements NestInterceptor<NewUserDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<NewUserDto> {
        return next.handle().pipe(map((data: Users) => ({ 
            msg: 'User successfully registered',
            username: data.username,
            roles: data.roles,
        })));
    }
}