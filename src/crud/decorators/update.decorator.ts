import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function ApiUpdateUnit() {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
        }),
        ApiQuery({name: "id"}),
        ApiQuery({name: "unitType"}),  
        ApiOperation({summary: "Update single unit under id in query params"})
    )
}