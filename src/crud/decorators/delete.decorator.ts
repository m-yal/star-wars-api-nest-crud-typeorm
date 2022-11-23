import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function ApiDeleteUnit() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: "Unit deleted from db",
        }),
        ApiQuery({name: "id"}),
        ApiQuery({name: "unitType"}),
        ApiOperation({summary: "Remove single unit under id in query params"})
    )
}