import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { CreatedDto } from "src/modules/crud/config/dto/created.dto";
import { Units } from "../types/types";

@Injectable()
export class CreatedUnitResponseInterseptor implements NestInterceptor<CreatedDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<CreatedDto> {
        return next.handle().pipe(map((created: Units) => ({ created })));
    }
}