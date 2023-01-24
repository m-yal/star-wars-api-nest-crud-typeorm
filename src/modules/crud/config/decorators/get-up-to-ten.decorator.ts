import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ApplyDecorators, UnitTypeEnum } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DataResponseInterceptor } from "../interceptors/data-response.interceptor";

export function GetUpToTenUnitsDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiQuery({ name: "page", schema: { default: 1 } }),
        ApiOperation({ summary: "Get up to 10 unit ordered by lastly adding" }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Up to ten units sent to client",
            type: DataResponseInterceptor
        }),
        ApiBadRequestResponse({
            type: DataResponseInterceptor
        }),
        Roles(Role.ADMIN, Role.USER),
        // UseGuards(RolesGuard),
        UseInterceptors(DataResponseInterceptor),
    )
}