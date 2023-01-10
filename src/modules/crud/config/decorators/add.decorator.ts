import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ExecutedResponseInterseptor } from "src/common/interceptors/executed-response.interceptor";
import { ApplyDecorators, UnitTypeEnum } from "src/common/types/types";
import { Roles } from "src/modules/auth/config/decorators/roles.decorator";
import { Role } from "src/modules/auth/config/entities/role.enum";
import { RolesGuard } from "src/modules/auth/config/guards/roles.guard";

export function ApiAddUnits(): ApplyDecorators {
    return applyDecorators(
        ApiQuery({ name: "unitType", schema: { default: UnitTypeEnum.People } }),
        ApiBody({schema: {
            default: {
                name: "Marius",
                height: 170,
                mass: 70,
                hair_color: "black",
                skin_color: "white",
                eye_color: "brown",
                birth_year: "2000",
                gender: "male",
            },
        }}),
        ApiOperation({ summary: "Add unit to db" }),
        Roles(Role.ADMIN),
        // UseGuards(RolesGuard),
        UseInterceptors(ExecutedResponseInterseptor),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Unit added to db",
            type: ExecutedResponseInterseptor
        }),
    )
}