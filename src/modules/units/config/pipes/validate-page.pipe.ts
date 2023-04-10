import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePagePipe implements PipeTransform {
    transform(value: any, metadata?: ArgumentMetadata) {
        if (value && Number.isInteger(value) && value > 0) {
            return value;
        }
        if (value <= 0) {
            throw new BadRequestException("Page value incorrect");
        }
    }
}