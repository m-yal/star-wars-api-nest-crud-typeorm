export interface IFilesActions {
    get(imageName: string): any;
    upload(files: Array<Express.Multer.File>): Promise<string[]>;
    delete(imgName: string): Promise<boolean>;
    fileExists(fileName: string): Promise<boolean>;
    findByNames(fileNames: string[]): Promise<Partial<File>[]>;
}