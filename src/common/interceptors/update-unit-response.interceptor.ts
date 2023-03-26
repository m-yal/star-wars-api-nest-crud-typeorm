import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

import { UpdatedDto } from "../../modules/crud/config/dto/updated.dto";
import { Units } from "../types/types";

@Injectable()
export class UpdatedUnitResponseInterceptor implements NestInterceptor<UpdatedDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<UpdatedDto> {
        return next.handle().pipe(map((updated: Units) => ({ updated })));
    }
}