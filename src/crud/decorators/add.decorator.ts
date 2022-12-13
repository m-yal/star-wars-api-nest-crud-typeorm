import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/interceptors/executed-response.interceptor";

export function ApiAddUnits() {
    return applyDecorators(
        ApiOperation({summary: "Add unit to db"}),
        ApiQuery({name: "unitType"}),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Unit added to db",
            type: ExecutedResponseInterseptor
        }),
        ApiBody({})
    )
}