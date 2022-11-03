import { Injectable } from '@nestjs/common';

@Injectable()
export class PeopleService {
    private readonly people: string[] = [
        "aaa",
        "bbb",
        "ccc",
        "ddd",
        "eee",
        "fff",
        "ggg",
        "hhh",
        "iii"
    ];
    
    getAll() {
        return this.people;
    }
}
