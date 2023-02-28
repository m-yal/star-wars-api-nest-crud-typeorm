import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateNamePipe implements PipeTransform {
    transform(value: any, metadata?: ArgumentMetadata) {
        if (value && typeof value === "string") return value;
        if (typeof value !== "string") {
            throw new BadRequestException("Name value is not a string");
        }
        if (!value) {
            throw new BadRequestException("Name value is empty string");
        }
    }
}