import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { Vehicles } from './vehicles.entity';

@Injectable()
export class PrepareVehiclesBodyPipe implements PipeTransform {
    
    constructor(
        private readonly peopleService: PeopleService,
        private readonly filmsService: FilmsService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [pilots, films] = await Promise.all([
            this.peopleService.findByNames(value.pilots || []),
            this.filmsService.findByNames(value.films || []),
        ]);
        return plainToInstance(Vehicles, {
            ...value,
            pilots,
            films,
        });
    }
}