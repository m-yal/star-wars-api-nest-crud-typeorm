import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { Repository } from 'typeorm';
import { StatusDto } from './dto/status.dto';
import { ImagesDto } from './dto/images.dto';

@Injectable()
export class FilesService {

    constructor(@InjectRepository(People) private peopleRepository: Repository<People>){}

    getBy(id: string): ImagesDto {
        throw new Error('Method not implemented.');
    }
    add(body: ImagesDto): StatusDto {
        throw new Error('Method not implemented.');
    }
    delete(imgId: string): StatusDto {
        throw new Error('Method not implemented.');
    }
}
