import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class ValidateNamePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value !== "string") {
            throw new HttpException("Name value is not a string", HttpStatus.BAD_REQUEST);
        }
        if (!value) {
            throw new HttpException("Name value is empty string", HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}