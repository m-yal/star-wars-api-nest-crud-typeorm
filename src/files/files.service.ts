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
import { CrudRepositories, Images, Unit, UnitTypeEnum, UnitTypes } from 'src/types/types';
import { ExecutedDto } from 'src/crud/dto/executed.dto';
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from './entities/image.entity';

@Injectable()
export class FilesService {

    constructor(
        @InjectRepository(People) private readonly peopleRepository: Repository<People>,
        @InjectRepository(Films) private readonly filmsRepository: Repository<Films>,
        @InjectRepository(Planets) private readonly planetsRepository: Repository<Planets>,
        @InjectRepository(Species) private readonly speciesRepository: Repository<Species>,
        @InjectRepository(Starships) private readonly starshipsRepository: Repository<Starships>,
        @InjectRepository(Vehicles) private readonly vehiclesRepository: Repository<Vehicles>,
        @InjectRepository(PeopleImage) private readonly peopleImageRepository: Repository<PeopleImage>,
        @InjectRepository(FilmsImage) private readonly filmsImageRepository: Repository<FilmsImage>,
        @InjectRepository(PlanetsImage) private readonly planetsImageRepository: Repository<PlanetsImage>,
        @InjectRepository(SpeciesImage) private readonly speciesImageRepository: Repository<SpeciesImage>,
        @InjectRepository(StarshipsImage) private readonly starshipsImageRepository: Repository<StarshipsImage>,
        @InjectRepository(VehiclesImage) private readonly vehiclesImageRepository: Repository<VehiclesImage>,
    ){}

    private readonly EXECUTION_RESULT_RESPONSE: ExecutedDto = {executed: true};

    getBy(imageName: string): fs.ReadStream {
        return createReadStream(join(process.cwd() + "/files", imageName));
    }
    
    async add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<ExecutedDto> {
        const unitRepo: CrudRepositories = this.getUnitRepoBy(unitType);
        const unitToUpdate: Unit = await unitRepo.findOne({where: {id: +unitID}, relations: ["images"]});
        if (!unitToUpdate) throw new NotFoundException();
        for await (const image of images) {
            await this.pushImageDataToImagesField(unitToUpdate, image, unitType);          
        }
        await unitRepo.save(unitToUpdate);
        return this.EXECUTION_RESULT_RESPONSE;
    }

    async delete(imgName: string, unitType: UnitTypes): Promise<ExecutedDto> {
        await this.removeSingleImageRecordFromDB(imgName, unitType);
        this.removeImageFile(imgName);
        return this.EXECUTION_RESULT_RESPONSE;
    }



    private async pushImageDataToImagesField(unitToUpdate: Unit, image: Express.Multer.File, unitType: UnitTypeEnum): Promise<void> {
        const imageToPut: Images = this.createUnitImageBy(unitType);
        imageToPut.filename = image.filename;
        const presentImages: Images[] = unitToUpdate.images;
        presentImages.push(imageToPut);
        unitToUpdate.images = presentImages;
    }

    private async removeSingleImageRecordFromDB(imgName: string,unitType: UnitTypeEnum): Promise<void> {
        const imageRepo: Repository<Images> = this.getImageRepoBy(unitType);
        await imageRepo.delete({filename: imgName});
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

    private getUnitRepoBy(unitType: UnitTypes): CrudRepositories {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleRepository;
            case UnitTypeEnum.Films: return this.filmsRepository;
            case UnitTypeEnum.Planets: return this.planetsRepository;
            case UnitTypeEnum.Species: return this.speciesRepository;
            case UnitTypeEnum.Starships: return this.starshipsRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesRepository;   
            default: throw new Error("No such repository found!");
        }
    }

    getImageRepoBy(unitType: UnitTypeEnum): Repository<Images> {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleImageRepository;
            case UnitTypeEnum.Films: return this.filmsImageRepository;
            case UnitTypeEnum.Planets: return this.planetsImageRepository;
            case UnitTypeEnum.Species: return this.speciesImageRepository;
            case UnitTypeEnum.Starships: return this.starshipsImageRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesImageRepository;   
            default: throw new Error("No such image repository found!");
        }
    }

    private createUnitImageBy(unitType: UnitTypeEnum): Images {
        switch (unitType) {
            case UnitTypeEnum.People: return new PeopleImage();
            case UnitTypeEnum.Films: return new FilmsImage();
            case UnitTypeEnum.Planets: return new PlanetsImage();
            case UnitTypeEnum.Species: return new SpeciesImage();
            case UnitTypeEnum.Starships: return new StarshipsImage();
            case UnitTypeEnum.Vehicles: return new VehiclesImage();
            default: throw new Error("No such image exists found!");
        }
    }
}