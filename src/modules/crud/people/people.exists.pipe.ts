import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { PeopleService } from './people.service';

@Injectable()
export class PeopleExistsPipe implements PipeTransform {

    constructor(private readonly peopleService: PeopleService) { }

    async transform(name: string) {
        const exists = await this.peopleService.exists(name);
        if (!exists) {
            throw new NotFoundException(`People with name: ${name} not found`);
        }
        return name;
    }
}
