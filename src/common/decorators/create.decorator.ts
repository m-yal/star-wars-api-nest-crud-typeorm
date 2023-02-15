import { applyDecorators, HttpStatus, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatedUnitResponseInterseptor } from "src/common/interceptors/created-unit-response.interceptor";
import { ApplyDecorators, Units } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";

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
        // UseGuards(RolesGuard),
        UseInterceptors(CreatedUnitResponseInterseptor),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Unit added to db",
            type: CreatedUnitResponseInterseptor
        }),
    )
}