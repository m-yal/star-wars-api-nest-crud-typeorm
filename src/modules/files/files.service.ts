import { Inject, Injectable } from "@nestjs/common";
import internal from "stream";
import { UnitTypes } from "src/common/types/types";
import { SwapiImagesRepository } from "./config/interfaces/repositories.interfaces";

@Injectable()
export class FilesService {
    constructor(@Inject("SwapiImagesRepository")private readonly repository: SwapiImagesRepository){}
    
    get(imageName: string): internal.Readable {
        return this.repository.get(imageName);
    }
    
    async add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<true> {
        return  this.repository.add(unitID, images, unitType);
    }

    async delete(imgName: string, unitType: UnitTypes): Promise<true> {
        return this.repository.delete(imgName, unitType);
    }
}