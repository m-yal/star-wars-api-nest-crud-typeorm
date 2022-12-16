import * as fs from 'fs';
import { UnitTypes } from 'src/types/types';

export interface FilesRepository {
    get(imageName: string): fs.ReadStream;
    add(unitID: string, images: Express.Multer.File[], unitType: UnitTypes): Promise<true>;
    delete(imgName: string, unitType: UnitTypes): Promise<true>;
}