import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/interceptors/executed-response.interceptor";
import { ApplyDecorators } from "src/types/types";

export function ApiDeleteUnit(): ApplyDecorators {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: "Unit deleted from db",
            type: ExecutedResponseInterseptor
        }),
        ApiQuery({name: "id"}),
        ApiQuery({name: "unitType"}),
        ApiOperation({summary: "Remove single unit under id in query params"})
    )
}