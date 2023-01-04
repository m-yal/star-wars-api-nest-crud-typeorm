import { Injectable } from "@nestjs/common";
import { UnitTypes } from "src/types/types";
import { MySQLFilesRepository } from "./files.mysql.repository";
import * as fs from 'fs';
import { AwsS3FilesRepository } from "./files.aws-s3.repository";
import internal from "stream";

@Injectable()
export class FilesService {

    constructor(private readonly repository: AwsS3FilesRepository){}

    get(imageName: string): fs.ReadStream | internal.Readable {
        return this.repository.get(imageName);
    }
    
    async add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<true> {
        return  this.repository.add(unitID, images, unitType);
    }

    async delete(imgName: string, unitType: UnitTypes): Promise<true> {
        return this.repository.delete(imgName, unitType);
    }
}