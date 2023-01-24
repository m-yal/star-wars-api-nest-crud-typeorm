import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { PeopleService } from './people.service';

@Injectable()
export class PeopleExistsPipe implements PipeTransform {

    constructor(private readonly peopleService: PeopleService) { }

    async transform(id: number) {
        const exists = await this.peopleService.exists(id);
        if (!exists) {
            throw new NotFoundException(`People with id: ${id} not found`);
        }
        return id;
    }
}
