import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { GetUnitsDto } from "../dto/get-units.dto";

export function ApiGetUnits() {
    return applyDecorators(
        ApiQuery({name: "page"}),
        ApiQuery({name: "unitType"}),
        ApiOperation({summary: "Get up to 10 unit ordered by lastly adding"}),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Up to ten units sent to client",
            type: GetUnitsDto
        })
    )
}