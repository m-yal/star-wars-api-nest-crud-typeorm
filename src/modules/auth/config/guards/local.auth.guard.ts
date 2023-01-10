import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/* Guard for loggingin in */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const result = await super.canActivate(context) as boolean;
        const request = await context.switchToHttp().getRequest();
        
        await super.logIn(request); //triggers passport to user sessions
        return result;
    }
}