import * as fs from 'fs';
import internal from 'stream';


export interface ISwapiImagesRepository {
    get(imageName: string): Promise<any>;
    add(images: Express.Multer.File[]): Promise<string[]>;
    delete(imgName: string): Promise<true>;
    fileExists(fileName: string): Promise<boolean>;
    findByNames(fileNames: string[]): Promise<Partial<File>[]>;
}

export interface ILocalImagesRepository extends ISwapiImagesRepository {
    get(imageName: string): Promise<fs.ReadStream>;
}

export interface IAWSImagesRepository extends ISwapiImagesRepository {
    get(imageName: string): Promise<internal.Readable>;
}