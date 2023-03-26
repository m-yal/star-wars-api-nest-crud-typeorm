import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { join, resolve } from 'path';
import { promisify } from 'util';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { ILocalImagesRepository } from '../interfaces/repositories.interfaces';
import { FileNamesTransformer } from '../files.names.transformer';
import { Files } from '../entities/file.entity';

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

@Injectable()
export class FSFilesRepository implements ILocalImagesRepository {

    constructor(
        @InjectRepository(Files)
        private readonly filesRecordsReposiotry: Repository<Files>,
        private readonly filenamesTrasformer: FileNamesTransformer,
        private readonly configService: ConfigService,
    ) { }

    async get(imageName: string): Promise<fs.ReadStream> {
        const imageDirPath: string = this.configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
        const path = join(imageDirPath, imageName);
        if (await this.fileExists(imageName)) {
            return createReadStream(path);
        }
        throw new NotFoundException("Image in FS was not found");            
    }

    async add(images: Express.Multer.File[]): Promise<string[]> {
        const imageDirPath = this.configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
        this.filenamesTrasformer.rename(images);
        const writtenFiles = images.map((file) => {
            const filePath = resolve(imageDirPath, file.filename);
            writeFile(filePath, file.buffer);
        });
        await Promise.all(writtenFiles);
        return this.filenamesTrasformer.extractFilenames(images);
    }

    async delete(imageName: string): Promise<true> {
        const imageDirPath = this.configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
        const path: fs.PathLike = `./${imageDirPath}/${imageName}`;
        if (fs.existsSync(path)) {
            await this.removeImageRecord(imageName)
            fs.unlinkSync(path);
            return true;
        } else {
            throw new NotFoundException('File for deletion not found');
        }
    }

    async fileExists(fileName: string): Promise<boolean> {
        try {
            const imageDirPath = this.configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
            fs.accessSync(join(imageDirPath, fileName));
            return true;
        } catch (error) {
            return false;
        }
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        const imageDirPath = this.configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
        const filePaths = fileNames.map(fileName => {
            return resolve(imageDirPath, fileName);
        });
        const accesses = filePaths.map((filePath) => access(filePath));
        await Promise.all(accesses);
        return fileNames.map((fileName) => ({ name: fileName }));
    }

    private async removeImageRecord(imageName: string) {
        try {
            const imageRecordToRemove = await this.filesRecordsReposiotry.findOneByOrFail({ name: imageName });
            await this.filesRecordsReposiotry.remove(imageRecordToRemove);
        } catch (error) {
            throw new NotFoundException("File record not found");
        }
    }
}