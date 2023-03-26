import { applyDecorators, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiQuery } from "@nestjs/swagger";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FilesInterceptor } from "@nestjs/platform-express";

import { ExecutedResponseInterseptor } from "../../../common/interceptors/executed-response.interceptor";
import { ApplyDecorators } from "../../../common/types/types";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from "../../auth/entities/role.enum";
import { RolesGuard } from "../../auth/guards/roles.guard";

export function UploadFilesDecorators(fieldName: string = 'files', maxCount: number, multerInterceptorOptions?: MulterOptions): ApplyDecorators {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, multerInterceptorOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody(getUploadFilesBodySchema(fieldName)),
    ApiQuery({ schema: { default: "Sly Moore" }, type: "string", name: "unitName" }),
    Roles(Role.ADMIN),
    UseGuards(RolesGuard),
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