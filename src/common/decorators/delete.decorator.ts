import { applyDecorators, HttpStatus, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ApplyDecorators } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { DeletedResponseInterseptor as DeletedResponseInterceptor } from "../interceptors/deleted-unit-response.interceptor";

export function DeleteUnitDecorators(): ApplyDecorators {
    return applyDecorators(
        ApiParam({name: "name", type: "string", schema: { default: "Unit Name" }}),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Unit deleted from db",
            type: DeletedResponseInterceptor
        }),
        Roles(Role.ADMIN),
        // UseGuards(RolesGuard),
        UseInterceptors(DeletedResponseInterceptor),
        ApiOperation({ summary: "Remove single unit under name in query params" }),
    )
}