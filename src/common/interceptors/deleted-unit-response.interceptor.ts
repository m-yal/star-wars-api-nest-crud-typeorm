import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { DeletedDto } from "src/modules/crud/config/dto/deleted.dto";
import { ExecutedDto } from "src/modules/crud/config/dto/executed.dto";
import { Units } from "../types/types";

@Injectable()
export class DeletedResponseInterseptor implements NestInterceptor<DeletedDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<DeletedDto> {
        return next.handle().pipe(map((deleted: Units) => ({ deleted })));
    }
}