import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { GetUnitsDto } from "src/modules/crud/config/dto/get-units.dto";

@Injectable()
export class DataResponseInterceptor implements NestInterceptor<GetUnitsDto> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<GetUnitsDto> {
        return next.handle().pipe(map((data) => ({ data })));
    }
}