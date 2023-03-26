import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '../entities/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requireRoles: Role[] = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requireRoles) return true;

        const passport = context.switchToHttp().getRequest().session.passport;
        if (!passport) throw new ForbiddenException();

        const { user } = passport;
        return requireRoles.some(role => user.roles.includes(role));
    }
}