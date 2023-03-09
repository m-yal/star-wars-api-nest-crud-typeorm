import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class LoginBodyValidationPipe implements PipeTransform {

    async transform(req: any) {
        const { body } = req;
        if (!body.username || !body.password) {
            console.log(`inside LoginBodyValidationPipe, before throwing exception`);
            throw new BadRequestException("Wrong input body format. It has to be: { username: '...', password: '...'}");
        }
    }
}