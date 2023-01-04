import { applyDecorators, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/interceptors/executed-response.interceptor";
import { ApplyDecorators } from "src/types/types";

export function ApiUpdateUnit(): ApplyDecorators {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            type: ExecutedResponseInterseptor
        }),
        ApiQuery({name: "id"}),
        ApiQuery({name: "unitType"}),  
        ApiOperation({summary: "Update single unit under id in query params"}),
        ApiBody({}),
    )
}