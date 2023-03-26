import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

import { People } from './people.entity';

import { PeopleService } from './people.service';

@Injectable()
export class PeopleExistsPipe implements PipeTransform {

    constructor(private readonly peopleService: PeopleService) { }

    async transform(people: People) {
        const personName = typeof people === "string" ? people : people.name;
        const exists = await this.peopleService.exists(personName);
        if (exists) return people;
        throw new NotFoundException(`People with name: ${personName} not found`);
    }
}
