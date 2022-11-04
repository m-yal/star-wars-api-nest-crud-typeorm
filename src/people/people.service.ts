import { Injectable } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { Person } from './interfaces/person.interface';
import { UpToTenPersons } from './interfaces/upToTenPersons.interface';
import { SamplePeopleData } from './SamplePeopleData';

@Injectable()
export class PeopleService {
    private readonly people: Person[] = new SamplePeopleData().getArray();
    
    update(body: PersonDto, id: string): void {
        this.people[+id] = body;
    }

    delete(id: string): void {
        console.log("people length before deleting " + this.people.length);
        this.people.splice(+id, 1);
        console.log("people length after deleting " + this.people.length);
    }

    add(body: PersonDto): void {
        this.people.push(body);
        console.log("people length after adding" + this.people.length);
    }

    getAll(): Person[] {
        return this.people;
    }

    getTen(startIndex: number = 0): UpToTenPersons {
        startIndex = startIndex >= this.people.length || startIndex < 0 ? 0 : startIndex;
        const endIndex = startIndex + 10 > this.people.length ? undefined : startIndex + 10;
        return {
            hasPrevPage: startIndex <= 0 ? false : true,
            hasNextPage: startIndex >= this.people.length - 10 ? false : true,
            people: this.people.reverse().slice(startIndex, endIndex)
        };
    }
}
