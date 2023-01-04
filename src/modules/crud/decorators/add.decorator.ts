import { applyDecorators, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/interceptors/executed-response.interceptor";
import { ApplyDecorators } from "src/types/types";

export function ApiAddUnits(): ApplyDecorators {
    return applyDecorators(
        ApiOperation({summary: "Add unit to db"}),
        ApiQuery({name: "unitType"}),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Unit added to db",
            type: ExecutedResponseInterseptor
        }),
        ApiBody({}),
    )
}