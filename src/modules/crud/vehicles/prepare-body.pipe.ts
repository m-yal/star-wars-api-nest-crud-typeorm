import { PipeTransform, Injectable, ArgumentMetadata, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilesService } from 'src/modules/files/files.service';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { Vehicles } from './vehicles.entity';

@Injectable()
export class PrepareVehiclesBodyPipe implements PipeTransform {
    
    constructor(
        private readonly peopleService: PeopleService,
        private readonly filmsService: FilmsService,
        @Inject("IFilesActions") private readonly filesService: FilesService,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
        const [pilots, films, images] = await Promise.all([
            this.peopleService.findByNames(value.pilots || []),
            this.filmsService.findByNames(value.films || []),
            this.filesService.findByNames(value.images || []),
        ]);
        return plainToInstance(Vehicles, {
            ...value,
            pilots,
            films,
            images,
        });
    }
}