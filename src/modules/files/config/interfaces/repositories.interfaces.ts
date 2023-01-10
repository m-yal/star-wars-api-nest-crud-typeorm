import * as fs from 'fs';
import { UnitTypes } from 'src/common/types/types';
import internal from 'stream';


export interface SwapiImagesRepository {
    get(imageName: string): any;
    add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<true>;
    delete(imgName: string, unitType: UnitTypes): Promise<true>;
}

export interface LocalImagesRepository extends SwapiImagesRepository {
    get(imageName: string): fs.ReadStream;
}

export interface AWSImagesRepository extends SwapiImagesRepository {
    get(imageName: string): internal.Readable;
}