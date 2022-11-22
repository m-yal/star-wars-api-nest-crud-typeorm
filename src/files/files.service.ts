import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { Repository } from 'typeorm';
import { StatusDto } from './dto/status.dto';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PersonDto } from 'src/people/dto/person.dto';

@Injectable()
export class FilesService {

    constructor(@InjectRepository(People) private peopleRepository: Repository<People>){}

    private readonly FILENAMES_SEPARATOR: string = ";;;";

    getBy(imgName: string): fs.ReadStream {
        return createReadStream(join(process.cwd() + "/files", imgName));
    }
    
    async add(id: string, files: Express.Multer.File[]): Promise<StatusDto> {
        const personToUpdate: PersonDto = await this.peopleRepository.findOneBy({id: +id});
        if (!personToUpdate) throw new NotFoundException(); 
        this.addImageLink(personToUpdate, files);
        await this.peopleRepository.save(personToUpdate);
        return { executed: true };
    }

    delete(imgName: string, id: string): StatusDto {
        this.removeImageLinkFromDB(imgName, id);
        return this.removeImageFile(imgName);
    }

    
    //Service methods for service methods :)
    extractFileLinks(personToUpdate: string): string[] {
        return personToUpdate.split(this.FILENAMES_SEPARATOR);
    }

    private async removeImageLinkFromDB(imgName: string, id: string): Promise<void> {
        const personToUpdate: PersonDto = await this.peopleRepository.findOneBy({id: +id});
        personToUpdate.images = this.removeFromPerson(imgName, personToUpdate.images);
        await this.peopleRepository.save(personToUpdate);
    }

    private removeFromPerson(imgName: string, images: string): string {
        const newImagesLinks: string = images.replace(imgName, "")
            .replace(this.FILENAMES_SEPARATOR.repeat(2), "")
            .replace(`(^${this.FILENAMES_SEPARATOR})|(${this.FILENAMES_SEPARATOR}$)`, "");
        newImagesLinks.replace(this.FILENAMES_SEPARATOR.repeat(1), this.FILENAMES_SEPARATOR);
        return newImagesLinks;
    }
    
    private removeImageFile(imgName: string): StatusDto {
        const path: fs.PathLike = `${__dirname}/../../files/${imgName}`;
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            return {executed: true};
        } else {
            throw new NotFoundException('File for deletion not found');
        }
    }

    private addImageLink(personToUpdate: PersonDto, files: Express.Multer.File[]): void {
        if (personToUpdate.images === "") {
            personToUpdate.images = this.assembleFilenamesToOneStr(files);
        } else {
            personToUpdate.images = personToUpdate.images + this.FILENAMES_SEPARATOR + this.assembleFilenamesToOneStr(files);
        }
    }

    private assembleFilenamesToOneStr(files: Express.Multer.File[]): string {
        let result: string = "";
        for (const file of files) {
            result += (file.filename + this.FILENAMES_SEPARATOR);
        }
        return result.replace(/;;;$/, "");
    }
}