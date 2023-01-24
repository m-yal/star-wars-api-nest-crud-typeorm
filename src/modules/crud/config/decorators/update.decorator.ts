import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { number } from "joi";
import { ExecutedResponseInterseptor } from "src/common/interceptors/executed-response.interceptor";
import { ApplyDecorators, Units } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

export function UpdateUnitDecorators(inputDto: Units): ApplyDecorators {
    return applyDecorators(
        ApiParam({ name: "id", type: number, schema: { default: 1 }}),
        ApiBody({
            schema: {
                default: inputDto
            }
        }),
        ApiResponse({
            status: HttpStatus.OK,
            type: ExecutedResponseInterseptor
        }),
        Roles(Role.ADMIN),
        // UseGuards(RolesGuard),
        UseInterceptors(ExecutedResponseInterseptor),
        ApiOperation({ summary: "Update single unit under name in query params" }),
    )
}