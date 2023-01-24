import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/common/interceptors/executed-response.interceptor";
import { ApplyDecorators, UnitTypeEnum } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { RolesGuard } from "src/modules/auth/config/guards/roles.guard";

export function DeleteUnitDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiParam({name: "id", type: "number", schema: { default: 1 }}),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Unit deleted from db",
            type: ExecutedResponseInterseptor
        }),
        Roles(Role.ADMIN),
        // UseGuards(RolesGuard),
        UseInterceptors(ExecutedResponseInterseptor),
        ApiOperation({ summary: "Remove single unit under id in query params" }),
    )
}