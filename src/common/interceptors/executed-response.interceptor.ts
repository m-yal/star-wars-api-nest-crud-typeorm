import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

import { ExecutedDto } from "../../modules/units/config/dto/executed.dto";

@Injectable()
export class ExecutedResponseInterseptor implements NestInterceptor<ExecutedDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<ExecutedDto> {
        return next.handle().pipe(map((executed: true) => ({ executed })));
    }
}