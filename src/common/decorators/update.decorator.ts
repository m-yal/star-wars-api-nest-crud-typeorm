import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UpdatedUnitResponseInterseptor } from "src/common/interceptors/update-unit-response.interceptor";
import { ApplyDecorators, Units } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

export function UpdateUnitDecorators(inputDto): ApplyDecorators {
    return applyDecorators(
        ApiBody({
            schema: {
                default: inputDto
            },
            type: inputDto,
        }),
        ApiResponse({
            status: HttpStatus.OK,
            type: UpdatedUnitResponseInterseptor
        }),
        Roles(Role.ADMIN),
        // UseGuards(RolesGuard),
        UseInterceptors(UpdatedUnitResponseInterseptor),
        ApiOperation({ summary: "Update single unit under name in query params" }),
    )
}