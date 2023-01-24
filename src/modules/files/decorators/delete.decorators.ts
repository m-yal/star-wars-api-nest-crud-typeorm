import { applyDecorators, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ExecutedResponseInterseptor } from 'src/common/interceptors/executed-response.interceptor';
import { ApplyDecorators, UnitTypeEnum } from 'src/common/types/types';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/modules/auth/entities/role.enum';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

export function DeleteFileDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiQuery({ name: "imgName", schema: { default: "" } }),
    ApiQuery({ name: "unitType", schema: { default: UnitTypeEnum.People } }),
    ApiResponse({
      status: HttpStatus.OK,
    }),
    ApiOperation({ summary: "Remove single person`s image under image id" }),
    Roles(Role.ADMIN),
    // UseGuards(RolesGuard),
    UseInterceptors(ExecutedResponseInterseptor),
  )
}