import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class ValidateIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (Number.isInteger(+value)) {
            throw new HttpException("Id value is not integer", HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}