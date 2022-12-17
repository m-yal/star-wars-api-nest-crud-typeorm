import { Injectable } from "@nestjs/common";
import { UnitTypes } from "src/types/types";
import { MySQLFilesRepository } from "./files-mysql.repository";
import * as fs from 'fs';

@Injectable()
export class FilesService {

    constructor(private readonly repository: MySQLFilesRepository){}

    get(imageName: string): fs.ReadStream {
        return this.repository.get(imageName);
    }
    
    async add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<true> {
        return  this.repository.add(unitID, images, unitType);
    }

    async delete(imgName: string, unitType: UnitTypes): Promise<true> {
        return this.repository.delete(imgName, unitType);
    }
}