import { applyDecorators, Header, HttpStatus, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { getApiBodySchema } from '../swagger/swagger-api-body.schema';

export function ApiUploadFiles(fieldName: string = 'files', maxCount: number, multerOptions?: MulterOptions) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, multerOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody(getApiBodySchema(fieldName))
  );
}

export function ApiDownloadFile() {
  return applyDecorators(
    ApiOperation({summary: "Get one image from one person"}),
    ApiResponse({
        schema: {
            type: "string",
            format: "binary"
        },
        status: HttpStatus.OK,
        description: "Got an image",
    }),
    ApiProduces('image/*'),
    Header("Content-type", "image/*")
  );
}

export function ApiDeleteFile() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
    }),
    ApiOperation({summary: "Remove single person`s image under image id"})
  )
}