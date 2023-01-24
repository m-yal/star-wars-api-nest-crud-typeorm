import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import path, { join } from 'path';
import { promisify } from 'util';
import { ILocalImagesRepository } from '../interfaces/repositories.interfaces';
import { FileNamesTransformer } from '../files.names.transformer';

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

@Injectable()
export class FSFilesRepository implements ILocalImagesRepository {

    private readonly IMAGES_RELATIVE_FILE_PATH = process.env.IMAGES_RELATIVE_FILE_PATH;
    private readonly fileNamesTransformer = new FileNamesTransformer();

    constructor() {
        fs.access(this.IMAGES_RELATIVE_FILE_PATH, err => {
            if (err) fs.mkdirSync(this.IMAGES_RELATIVE_FILE_PATH, { recursive: true });
        })
    }

    get(imageName: string): fs.ReadStream {
        return createReadStream(join(process.cwd() + process.env.IMAGES_RELATIVE_FILE_PATH, imageName));
    }

    async add(images: Express.Multer.File[]): Promise<string[]> {
        this.fileNamesTransformer.rename(images);
        const writtenFiles = images.map((file) => {
            const filePath = path.resolve(this.IMAGES_RELATIVE_FILE_PATH, file.filename);
            writeFile(filePath, file.buffer);
        });
        Promise.all(writtenFiles);
        return this.fileNamesTransformer.extractFilenames(images);
    }

    async delete(imageName: string): Promise<true> {
        const path: fs.PathLike = `./${process.env.IMAGES_RELATIVE_FILE_PATH}/${imageName}`;
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            return true;
        } else {
            throw new NotFoundException('File for deletion not found');
        }
    }

    async fileExists(fileName: string): Promise<boolean> {
        try {
          await access(join(this.IMAGES_RELATIVE_FILE_PATH, fileName));
          return true;
        } catch (e) {
          return false;
        }
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        const filePaths = fileNames.map(fileName => {
            return path.resolve(this.IMAGES_RELATIVE_FILE_PATH, fileName);
        });
        const accesses = filePaths.map((filePath) => access(filePath));
        await Promise.all(accesses);
        return fileNames.map((fileName) => ({ name: fileName }));
    }
}