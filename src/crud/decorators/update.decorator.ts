import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/interceptors/executed-response.interceptor";

export function ApiUpdateUnit() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            type: ExecutedResponseInterseptor
        }),
        ApiQuery({name: "id"}),
        ApiQuery({name: "unitType"}),  
        ApiOperation({summary: "Update single unit under id in query params"}),
        ApiBody({})
    )
}