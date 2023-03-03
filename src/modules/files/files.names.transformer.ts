import { Injectable } from "@nestjs/common";
import { extname } from "path";

@Injectable()
export class FileNamesTransformer {
    rename(images: Express.Multer.File[]): void {
        images.map((image: Express.Multer.File) => {
            const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
            const ext = extname(image.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            image.filename = filename;
        });
    }

    extractFilenames(images: Express.Multer.File[]): string[] {
        return images.map((image: Express.Multer.File) => image.filename);
    }
}