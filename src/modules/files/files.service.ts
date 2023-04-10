import { Inject, Injectable } from "@nestjs/common";
import internal from "stream";

import { ISwapiImagesRepository } from "./interfaces/repositories.interfaces";
import { IFilesActions } from "./interfaces/files.controller.interface";
import { FilesInjectionToken } from "./injection.tokens";

@Injectable()
export class FilesService implements IFilesActions {

    constructor(
        @Inject(FilesInjectionToken.IMAGES_REPOSITORY) private readonly repository: ISwapiImagesRepository,
    ) { }

    async get(fileName: string): Promise<internal.Readable> {
        return await this.repository.get(fileName);
    }

    async upload(files: Express.Multer.File[]): Promise<string[]> {
        return this.repository.add(files);
    }

    async delete(fileName: string): Promise<boolean> {
        return this.repository.delete(fileName);
    }

    async fileExists(fileName: string): Promise<boolean> {
        return await this.repository.fileExists(fileName);
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        return this.repository.findByNames(fileNames);
    }
}