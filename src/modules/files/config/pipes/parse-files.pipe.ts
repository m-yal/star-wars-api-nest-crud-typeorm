import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, } from '@nestjs/common';
  
  @Injectable()
  export class ParseFiles implements PipeTransform {
    transform( files: Express.Multer.File[], metadata: ArgumentMetadata): Express.Multer.File[] {
      if (!files || files.length === 0) throw new BadRequestException('Validation failed (files expected)');
      return files;
    }
  }