import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDto } from './dto/person.dto';
import { People } from './entities/people.entity';

@Injectable()
export class PeopleService {
    constructor(@InjectRepository(People) private peopleRepository: Repository<People>){}

    // private readonly people: PersonDto[] = new SamplePeopleData().getArray();
    
    update(body: PersonDto, url: string): void {
        this.peopleRepository.update(url, body);
    }

    // delete(url: string): void {
    //     this.peopleRepository.remove({url});
    // }

    add(body: PersonDto): void {
        this.peopleRepository.insert(body);
    }

    // getTen(startIndex: number = 0): UpToTenPersons {
    //     startIndex = startIndex >= this.peopleRepository.length || startIndex < 0 ? 0 : startIndex;
    //     const endIndex = startIndex + 10 > this.peopleRepository.length ? undefined : startIndex + 10;
    //     return {
    //         hasPrevPage: startIndex <= 0 ? false : true,
    //         hasNextPage: startIndex >= this.peopleRepository.length - 10 ? false : true,
    //         people: this.peopleRepository.reverse().slice(startIndex, endIndex)
    //     };
    // }
}
