import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Units } from "src/common/types/types";
import { GetUpToTenUnitsDto } from "../dto/get-up-to-ten-units.dto";

@Injectable()
export class DataResponseInterceptor implements NestInterceptor<GetUpToTenUnitsDto<Units>> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<GetUpToTenUnitsDto<Units>> {
        return next.handle().pipe(map((data) => ({ data })));
    }
}