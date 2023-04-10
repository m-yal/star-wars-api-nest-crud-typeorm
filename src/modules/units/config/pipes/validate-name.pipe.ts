import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateNamePipe implements PipeTransform {
    transform(value: any, metadata?: ArgumentMetadata) {
        if (value && typeof value === "string") return value;
        this.throwExceptionWithPreciseMessage(value)
    }
    
    private throwExceptionWithPreciseMessage(value: any) {
        if (typeof value !== "string") {
            throw new BadRequestException("Name value is not a string");
        }
        if (!value) {
            throw new BadRequestException("Name value is empty string");
        }
    }
}