import { faker } from "@faker-js/faker";
import { Readable } from "stream";
import { buffer } from "stream/consumers";

export class MockMulterFilesGenerator {
    static generateImages(amount: number): Express.Multer.File[] {
        const images = [];
        for (let i = 0; i < amount; i++) {
            images.push(this.generateImage());
        }
        return images;
    }

    static generateImage(): Express.Multer.File {
        const name = `${faker.random.word()}.jpg`;
        const buffer = Buffer.from(faker.random.words(10))
        return {
            originalname: name,
            mimetype: 'image',
            path: faker.random.words(3).replace(" ", ""),
            buffer: buffer,
            fieldname: "files",
            encoding: "",
            size: buffer.length,
            stream: new Readable(),
            destination: "/images",
            filename: name,
        }
    }
}