import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { getApiBodySchema } from '../swagger/swagger-api-body.schema';

export function ApiUploadFiles(fieldName: string = 'files', maxCount: number, multerOptions?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, multerOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody(getApiBodySchema(fieldName))
  );
}