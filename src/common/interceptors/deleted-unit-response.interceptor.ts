import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

import { DeletedDto } from "../../modules/crud/config/dto/deleted.dto";
import { Units } from "../types/types";

@Injectable()
export class DeletedResponseInterceptor implements NestInterceptor<DeletedDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<DeletedDto> {
        return next.handle().pipe(map((deleted: Units) => ({ deleted })));
    }
}