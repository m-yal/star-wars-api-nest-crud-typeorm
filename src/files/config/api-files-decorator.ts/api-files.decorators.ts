import { applyDecorators, CustomDecorator, Header, HttpStatus, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { ApplyDecorators } from 'src/types/types';
import { getUploadFilesBodySchema } from '../swagger/swagger-api-body.schema';

export function ApiUploadFiles(fieldName: string = 'files', maxCount: number, multerOptions?: MulterOptions): ApplyDecorators {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, multerOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody(getUploadFilesBodySchema(fieldName))
  );
}

export function ApiDownloadFile(): ApplyDecorators {
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

export function ApiDeleteFile(): ApplyDecorators {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
    }),
    ApiOperation({summary: "Remove single person`s image under image id"})
  )
}