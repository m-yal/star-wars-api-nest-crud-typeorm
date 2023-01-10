import { InjectRepository } from "@nestjs/typeorm";
import { Films } from "src/modules/crud/config/entities/films.entity";
import { People } from "src/modules/crud/config/entities/people.entity";
import { Planets } from "src/modules/crud/config/entities/planets.entity";
import { Species } from "src/modules/crud/config/entities/species.entity";
import { Starships } from "src/modules/crud/config/entities/starships.entity";
import { Vehicles } from "src/modules/crud/config/entities/vehicles.entity";
import { CrudRepositories, Images, Unit, UnitTypeEnum, UnitTypes } from "src/common/types/types";
import { Repository } from "typeorm";
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from "./config/entities/image.entity";
import { AWSImagesRepository } from "./config/interfaces/repositories.interfaces";
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { extname } from "path";
import internal from "stream";
import { awsS3ClientConfig } from "src/common/configs/aws-s3.config";

config();

@Injectable()
export class AwsS3FilesRepository implements AWSImagesRepository {
    
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
        // private readonly configService: ConfigService
    ){}
    
    get(imageName: string): internal.Readable {
        const options = this.getAwsS3GetOrDeleteOptions(imageName);
        return this.getS3().getObject(options).createReadStream(); 
    }

    async add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<true> {
        const unitRepo: CrudRepositories = this.getUnitRepoBy(unitType);
        const unitToUpdate: Unit = await unitRepo.findOne({where: {id: +unitID}, relations: ["images"]});
        if (!unitToUpdate) {
            throw new NotFoundException("Not found unit for adding images");
        };
        
        this.rename(images);
        const s3 = this.getS3();
        const awsResponses: Promise<any>[] = images.map(image => {
            return s3.upload({
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Body: image.buffer,
                Key: image.filename
            }).promise();
        });
        await Promise.all(awsResponses).then((values) => {
            console.log("awsResponses: " + JSON.stringify(values));
        });
        

        for await (const image of images) {
            await this.updateImageField(unitToUpdate, image, unitType);          
        }
        await unitRepo.save(unitToUpdate);

        return true;
    }

    async delete(imgName: string, unitType: UnitTypes): Promise<true> {
        await this.removeImageFromS3(imgName);
        await this.removeSingleImageRecordFromDB(imgName, unitType);

        return true;
    }





    private async removeImageFromS3(imgName: string) {
        const options = this.getAwsS3GetOrDeleteOptions(imgName);
        const deleteResponses = [];
        this.getS3().deleteObject(options).promise().then((value) => {
            deleteResponses.push(value);
        });
        Promise.all(deleteResponses).then((values) => {
            console.log("awsResponses: " + JSON.stringify(values));
        });
    }

    private getAwsS3GetOrDeleteOptions(imgName: string) {
        return {
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Key: imgName
        };
    }

    private getUnitRepoBy(unitType: UnitTypes): CrudRepositories {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleRepository;
            case UnitTypeEnum.Films: return this.filmsRepository;
            case UnitTypeEnum.Planets: return this.planetsRepository;
            case UnitTypeEnum.Species: return this.speciesRepository;
            case UnitTypeEnum.Starships: return this.starshipsRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesRepository;   
            default: throw new BadRequestException("No such repository found!");
        }
    }

    private async updateImageField(unitToUpdate: Unit, image: Express.Multer.File, unitType: UnitTypeEnum): Promise<void> {
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

    private getImageRepoBy(unitType: UnitTypeEnum): Repository<Images> {
        switch (unitType) {
            case UnitTypeEnum.People: return this.peopleImageRepository;
            case UnitTypeEnum.Films: return this.filmsImageRepository;
            case UnitTypeEnum.Planets: return this.planetsImageRepository;
            case UnitTypeEnum.Species: return this.speciesImageRepository;
            case UnitTypeEnum.Starships: return this.starshipsImageRepository;
            case UnitTypeEnum.Vehicles: return this.vehiclesImageRepository;   
            default: throw new BadRequestException("No such image repository found!");
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
            default: throw new BadRequestException("No such image exists found!");
        }
    }

    private rename(images: Express.Multer.File[]) {
        for (const image of images) {
            const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
            const ext = extname(image.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            image.filename = filename;            
        }
    }

    private getS3(): S3 {
        return new S3(awsS3ClientConfig);
    }
}