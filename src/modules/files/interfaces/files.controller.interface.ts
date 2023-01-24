export interface IFilesActions {
    get(imageName: string): any;
    add(files: Array<Express.Multer.File>): Promise<string[]>;
    delete(imgName: string): Promise<true>;
}