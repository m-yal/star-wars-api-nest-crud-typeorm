import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

import { Roles } from "./../../modules/auth/decorators/roles.decorator";
import { DataResponseInterceptor } from "../../modules/crud/config/interceptors/data-response.interceptor";
import { Role } from "./../../modules/auth/entities/role.enum";
import { ApplyDecorators } from "../types/types";
import { GetUpToTenUnitsDto } from "../../modules/crud/config/dto/get-up-to-ten-units.dto";
import { RolesGuard } from "../../modules/auth/guards/roles.guard";

export function GetUpToTenUnitsDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiQuery({ name: "page", schema: { default: 1 } }),
        ApiOperation({ summary: "Get up to 10 unit ordered by lastly adding" }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Up to ten units sent to client",
            type: GetUpToTenUnitsDto
        }),
        ApiBadRequestResponse({
            type: GetUpToTenUnitsDto
        }),
        Roles(Role.ADMIN, Role.USER),
        UseGuards(RolesGuard),
        UseInterceptors(DataResponseInterceptor),
    )
}