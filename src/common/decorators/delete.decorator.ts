import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../../modules/auth/decorators/roles.decorator";
import { Role } from "../../modules/auth/entities/role.enum";
import { RolesGuard } from "../../modules/auth/guards/roles.guard";
import { DeletedResponseInterceptor } from "../interceptors/deleted-unit-response.interceptor";
import { ApplyDecorators } from "../types/types";

export function DeleteUnitDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiParam({name: "name", type: "string", schema: { default: "Unit Name" }}),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Unit deleted from db",
            type: DeletedResponseInterceptor
        }),
        Roles(Role.ADMIN),
        UseGuards(RolesGuard),
        UseInterceptors(DeletedResponseInterceptor),
        ApiOperation({ summary: "Remove single unit under name in query params" }),
    )
}