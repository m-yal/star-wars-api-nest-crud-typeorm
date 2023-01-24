import { ApplyDecorators, UnitTypeEnum } from "src/common/types/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/entities/role.enum";
import { applyDecorators, UseGuards, UseInterceptors } from "@nestjs/common";
import { ExecutedResponseInterseptor } from "src/common/interceptors/executed-response.interceptor";
import { ApiBody, ApiConsumes, ApiQuery } from "@nestjs/swagger";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FilesInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

export function UploadFilesDecorators(fieldName: string = 'files', maxCount: number, multerInterceptorOptions?: MulterOptions): ApplyDecorators {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, multerInterceptorOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody(getUploadFilesBodySchema(fieldName)),
    Roles(Role.ADMIN),
    // UseGuards(RolesGuard),
    UseInterceptors(ExecutedResponseInterseptor),
  );
};

function getUploadFilesBodySchema(fieldName: string) {
  return {
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          }
        },
      },
    },
  }
};