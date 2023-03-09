import { Inject, Injectable } from "@nestjs/common";
import internal from "stream";
import { ISwapiImagesRepository } from "./interfaces/repositories.interfaces";
import { IFilesActions } from "./interfaces/files.controller.interface";

@Injectable()
export class FilesService implements IFilesActions {

    constructor(@Inject("SwapiImagesRepository") private readonly repository: ISwapiImagesRepository) { }
    
    get(fileName: string): internal.Readable {
        return this.repository.get(fileName);
    }
    
    async upload(files: Express.Multer.File[]): Promise<string[]> {
        return this.repository.add(files);
    }

    async delete(fileName: string): Promise<boolean> {
        return this.repository.delete(fileName);
    }

    async fileExists(fileName: string): Promise<boolean> {
        return this.repository.fileExists(fileName);
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        return this.repository.findByNames(fileNames);
    }
}