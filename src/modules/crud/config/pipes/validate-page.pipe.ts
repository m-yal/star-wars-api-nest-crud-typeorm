import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePagePipe implements PipeTransform {
    transform(value: any, metadata?: ArgumentMetadata) {
        if (value && Number.isInteger(value) && value > 0) {
            return value;
        }
        if (!Number.isInteger(value)) {
            throw new BadRequestException("Page value is not integer");
        }
        if (value <= 0) {
            throw new BadRequestException("Page value is below or equals to 0");
        }
    }
}