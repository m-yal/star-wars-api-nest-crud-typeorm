import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../../modules/auth/decorators/roles.decorator";
import { Role } from "../../modules/auth/entities/role.enum";
import { RolesGuard } from "../../modules/auth/guards/roles.guard";
import { CreatedUnitResponseInterceptor } from "../interceptors/created-unit-response.interceptor";
import { ApplyDecorators } from "../types/types";

export function CreateUnitDecorators(createUnitDto): ApplyDecorators {
    return applyDecorators(
        ApiBody({
            type: createUnitDto,
            schema: {
                default: createUnitDto,
            },
        }),
        ApiOperation({ summary: "Add Unit to db" }),
        Roles(Role.ADMIN),
        UseGuards(RolesGuard),
        UseInterceptors(CreatedUnitResponseInterceptor),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Unit added to db",
            type: CreatedUnitResponseInterceptor
        }),
    )
}