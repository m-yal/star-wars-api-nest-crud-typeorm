import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/crud/entities/people.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Films } from 'src/crud/entities/films.entity';
import { Planets } from 'src/crud/entities/planets.entity';
import { Species } from 'src/crud/entities/species.entity';
import { Starships } from 'src/crud/entities/starships.entity';
import { Vehicles } from 'src/crud/entities/vehicles.entity';
import { CrudRepositories, Unit, UnitTypeEnum, UnitTypes } from 'src/crud/types/types';
import { ExecutedDto } from 'src/crud/dto/executed.dto';

@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(People) private readonly peopleRepository: Repository<Unit>,
        @InjectRepository(Films) private readonly filmsRepository: Repository<Unit>,
        @InjectRepository(Planets) private readonly planetsRepository: Repository<Unit>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Unit>,
        @InjectRepository(Starships) private readonly starshipsRepository: Repository<Unit>,
        @InjectRepository(Vehicles) private readonly vehiclesRepository: Repository<Unit>,
    ){}

    private readonly FILENAMES_SEPARATOR: string = ";";
    private readonly EXECUTION_RESULT_RESPONSE = {executed: true};

    getBy(imgName: string): fs.ReadStream {
        return createReadStream(join(process.cwd() + "/files", imgName));
    }
    
    async add(id: string, files: Express.Multer.File[], unitType: UnitTypes): Promise<ExecutedDto> {
        const currentRepository: CrudRepositories = this.getRepoBy(unitType);
        const unitToUpdate: Unit = await currentRepository.findOneBy({id: +id});
        if (!unitToUpdate) throw new NotFoundException();
        unitToUpdate.images =  this.addImageLink(unitToUpdate.images, files);
        await currentRepository.save(unitToUpdate);
        return this.EXECUTION_RESULT_RESPONSE;
    }

    async delete(imgName: string, id: string, unitType: UnitTypes): Promise<ExecutedDto> {
        await this.removeImageLinkFromDB(imgName, id, unitType);
        this.removeImageFile(imgName);
        return this.EXECUTION_RESULT_RESPONSE;
    }

    

    //Service methods for service methods :)
    extractFileLinks(unitToUpdate: string): string[] {
        return unitToUpdate.split(this.FILENAMES_SEPARATOR);
    }

    private async removeImageLinkFromDB(imgName: string, id: string, unitType: UnitTypes): Promise<void> {
        const currentRepository: CrudRepositories = this.getRepoBy(unitType);
        const unitToUpdate: any = await currentRepository.findOneBy({id: +id});
        unitToUpdate.images = this.transformImagesLinks(imgName, unitToUpdate.images);
        await currentRepository.save(unitToUpdate);
    }

    private transformImagesLinks(imgName: string, images: string): string {
        const newImagesLinks: string = images.replace(imgName, "")
            .replace(this.FILENAMES_SEPARATOR.repeat(2), "")
            .replace(`(^${this.FILENAMES_SEPARATOR})[1,]|(${this.FILENAMES_SEPARATOR}[1,]$)`, "");
        newImagesLinks.replace(this.FILENAMES_SEPARATOR.repeat(1), this.FILENAMES_SEPARATOR);
        return newImagesLinks;
    }
    
    private removeImageFile(imgName: string): ExecutedDto {
        const path: fs.PathLike = `${__dirname}/../../files/${imgName}`;
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            return {executed: true};
        } else {
            throw new NotFoundException('File for deletion not found');
        }
    }

    private addImageLink(imagesLinks: any, files: Express.Multer.File[]): string {
        return imagesLinks === "" ? this.assembleFilenamesToOneStr(files) : imagesLinks + this.FILENAMES_SEPARATOR + this.assembleFilenamesToOneStr(files);
    }

    private assembleFilenamesToOneStr(files: Express.Multer.File[]): string {
        let result: string = "";
        for (const file of files) {
            result += (file.filename + this.FILENAMES_SEPARATOR);
        }
        return result.replace(/;$/, "");
    }

    private getRepoBy(unitType: UnitTypes): CrudRepositories {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleRepository;
            case UnitTypeEnum.Films: return this.filmsRepository;
            case UnitTypeEnum.Planets: return this.planetsRepository;
            case UnitTypeEnum.Species: return this.speciesRepository;
            case UnitTypeEnum.Starhips: return this.starshipsRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesRepository;   
            default: throw new Error("No such repository found!");
        }
    }
}