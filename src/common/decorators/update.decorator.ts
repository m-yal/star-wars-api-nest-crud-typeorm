import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ApplyDecorators } from "../types/types";
import { Roles } from "../../modules/auth/decorators/roles.decorator";
import { Role } from "../../modules/auth/entities/role.enum";
import { UpdatedUnitResponseInterceptor } from "../interceptors/update-unit-response.interceptor";
import { RolesGuard } from "../../modules/auth/guards/roles.guard";

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
            type: UpdatedUnitResponseInterceptor
        }),
        Roles(Role.ADMIN),
        UseGuards(RolesGuard),
        UseInterceptors(UpdatedUnitResponseInterceptor),
        ApiOperation({ summary: "Update single unit under name in query params" }),
    )
}