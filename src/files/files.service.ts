import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { Repository } from 'typeorm';
import { StatusDto } from './dto/status.dto';
import { ImagesDto } from './dto/images.dto';
import * as fs from 'fs';

@Injectable()
export class FilesService {

    constructor(@InjectRepository(People) private peopleRepository: Repository<People>){}

    getBy(id: string): ImagesDto {
        throw new Error('Method not implemented.');
    }
    add(body: ImagesDto): StatusDto {
        throw new Error('Method not implemented.');
    }
    delete(imgName: string): StatusDto {
        const path: fs.PathLike = `${__dirname}/../../files/${imgName}`;
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            return {executed: true};
        } else {
            throw new NotFoundException('File for deletion not found');
        }
    }
}
