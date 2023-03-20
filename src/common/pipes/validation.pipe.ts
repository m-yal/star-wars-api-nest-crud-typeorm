import { ValidationPipe, UnprocessableEntityException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export const swapiValidationPipe = new ValidationPipe({
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorMessage = validationErrors
            .map((error) => {
                return `${error.property} has wrong value ${error.value} ${Object.values(error.constraints).join(', ')}`;
            })
            .join(', ');
        return new UnprocessableEntityException(errorMessage);
    },
});