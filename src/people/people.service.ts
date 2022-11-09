import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDto } from './dto/person.dto';
import { People } from './entities/people.entity';

@Injectable()
export class PeopleService {
    constructor(@InjectRepository(People) private peopleRepository: Repository<People>){}

    async update(body: PersonDto, id: number): Promise<void> {
        await this.peopleRepository.update({id: id}, body);
        return;
    }

    async delete(id: number): Promise<void> {
        const people = await this.peopleRepository.findOneBy({id: id});
        await this.peopleRepository.remove(people);
        return;
    }

    async add(body: PersonDto): Promise<void> {
        await this.peopleRepository.insert(body);
        return;
    }

    async getAll(page: number): Promise<any> {
        const UNITS_PER_PAGE = 10; //todo move to constants
        const pageIndex = page - 1;
        const units = await this.peopleRepository.find({
            order: {
                created: "DESC"
            },
            take: UNITS_PER_PAGE,
            skip: pageIndex * UNITS_PER_PAGE
        });
        const count = await this.peopleRepository.count();
        return {
            data: units,
            hasNext: page * UNITS_PER_PAGE < count ? true : false,
            hasPrev: pageIndex === 0 ? false : true
        };
    }
}
