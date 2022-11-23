import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function ApiAddUnits() {
    return applyDecorators(
        ApiOperation({summary: "Add unit to db"}),
        ApiQuery({name: "unitType"}),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Unit added to db"
        })
    )
}