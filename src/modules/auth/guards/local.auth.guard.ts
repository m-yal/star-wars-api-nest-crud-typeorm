import { BadRequestException, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/* Guard for loggingin in */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    async canActivate(context: ExecutionContext) {
        try {
            const result = await super.canActivate(context) as boolean;
            const request = await context.switchToHttp().getRequest();
            await super.logIn(request); //triggers passport to user sessions
            return result;
        } catch (error) {
            const request = await context.switchToHttp().getRequest();
            if (Object.keys(request.body).length === 0) {
                throw new BadRequestException("Empty body object recived")
            }
            if (!request.body.username) {
                throw new BadRequestException("'username' field is absenct in body")
            }
            if (!request.body.password) {
                throw new BadRequestException("'password' field is absenct in body")
            }
            if (error["response"]["message"] === "Wrong password or username") {
               throw new ForbiddenException(error["response"]["message"]);
            }
        }
    }
}