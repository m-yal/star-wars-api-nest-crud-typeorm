import { applyDecorators, HttpStatus, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/common/interceptors/executed-response.interceptor";
import { ApplyDecorators, Units } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";

export function CreateUnitDecorators(inputDto: Units): ApplyDecorators {
    return applyDecorators(
        ApiBody({
            schema: {
                default: inputDto
            }
        }),
        ApiOperation({ summary: "Add people to db" }),
        Roles(Role.ADMIN),
        // UseGuards(RolesGuard),
        UseInterceptors(ExecutedResponseInterseptor),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Person added to db",
            type: ExecutedResponseInterseptor
        }),
    )
}