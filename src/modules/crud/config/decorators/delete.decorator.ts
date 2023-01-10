import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/common/interceptors/executed-response.interceptor";
import { ApplyDecorators, UnitTypeEnum } from "src/common/types/types";
import { Roles } from "src/modules/auth/config/decorators/roles.decorator";
import { Role } from "src/modules/auth/config/entities/role.enum";
import { RolesGuard } from "src/modules/auth/config/guards/roles.guard";

export function ApiDeleteUnit(): ApplyDecorators {
    return applyDecorators(
        ApiQuery({ name: "id", schema: { default: 1 } }),
        ApiQuery({ name: "unitType", schema: { default: UnitTypeEnum.People } }),
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