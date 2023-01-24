import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class ValidatePagePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (Number.isInteger(value) && value <= 0) {
            throw new HttpException("Page value is below 0", HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}