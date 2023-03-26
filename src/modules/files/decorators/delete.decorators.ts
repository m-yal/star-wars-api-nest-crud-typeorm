import { applyDecorators, HttpStatus, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ExecutedResponseInterseptor } from '../../../common/interceptors/executed-response.interceptor';
import { ApplyDecorators } from '../../../common/types/types';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/entities/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';

export function DeleteFileDecorators(): ApplyDecorators {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
    }),
    ApiBody({
      schema: {
        default: {
          imageName: ""
        }
      }
    }),
    ApiOperation({ summary: "Remove single unit`s image under image name" }),
    Roles(Role.ADMIN),
    UseGuards(RolesGuard),
    UseInterceptors(ExecutedResponseInterseptor),
    UsePipes(new ValidationPipe()),
  )
}