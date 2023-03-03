import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { join, resolve } from 'path';
import { promisify } from 'util';
import { ILocalImagesRepository } from '../interfaces/repositories.interfaces';
import { FileNamesTransformer } from '../files.names.transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from '../file.entity';
import { Repository } from 'typeorm';
import { config } from 'dotenv';

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

config();

@Injectable()
export class FSFilesRepository implements ILocalImagesRepository {

    private readonly IMAGES_RELATIVE_FILE_PATH = process.env.IMAGES_RELATIVE_FILE_PATH;

    constructor(
        @InjectRepository(Files) private readonly filesRecordsReposiotry: Repository<Files>,
        private readonly filenamesTrasformer: FileNamesTransformer,
    ) {
        fs.access(this.IMAGES_RELATIVE_FILE_PATH, err => {
            if (err) fs.mkdirSync(this.IMAGES_RELATIVE_FILE_PATH, { recursive: true });
        })
    }

    get(imageName: string): fs.ReadStream {
        const path = join(process.cwd() + "/" + process.env.IMAGES_RELATIVE_FILE_PATH, imageName);
        try {
            return createReadStream(path);
        } catch (error) {
            throw new NotFoundException("Image in FS was not found");            
        }
    }

    async add(images: Express.Multer.File[]): Promise<string[]> {
        this.filenamesTrasformer.rename(images);
        const writtenFiles = images.map((file) => {
            const filePath = resolve(this.IMAGES_RELATIVE_FILE_PATH, file.filename);
            writeFile(filePath, file.buffer);
        });
        await Promise.all(writtenFiles);
        return this.filenamesTrasformer.extractFilenames(images);
    }

    async delete(imageName: string): Promise<true> {
        const path: fs.PathLike = `./${process.env.IMAGES_RELATIVE_FILE_PATH}/${imageName}`;
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            const imageRecordToRemove = await this.filesRecordsReposiotry.findOneByOrFail({ name: imageName });
            await this.filesRecordsReposiotry.remove(imageRecordToRemove);
            return true;
        } else {
            throw new NotFoundException('File for deletion not found');
        }
    }

    fileExists(fileName: string): boolean {
        try {
            fs.accessSync(join(this.IMAGES_RELATIVE_FILE_PATH, fileName));
            return true;
        } catch (error) {
            return false;
        }
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        const filePaths = fileNames.map(fileName => {
            return resolve(this.IMAGES_RELATIVE_FILE_PATH, fileName);
        });
        const accesses = filePaths.map((filePath) => access(filePath));
        await Promise.all(accesses);
        return fileNames.map((fileName) => ({ name: fileName }));
    }
}