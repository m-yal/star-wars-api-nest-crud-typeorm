import { faker } from "@faker-js/faker";
import { Readable } from "stream";

export default class MockMulterFilesGenerator {
    static generateImages(amount: number) {
        const images = [];
        for (let i = 0; i < amount; i++) {
            images.push(this.generateImage());
        }
        return images;
    }

    static generateImage() {
        return {
            originalname: `${faker.random.word}.jpg`,
            mimetype: 'image',
            path: faker.random.words(3),
            buffer: Buffer.from(faker.random.words(10)),
            fieldname: "files",
            encoding: "",
            size: 0,
            stream: new Readable(),
            destination: "",
            filename: `${faker.random.word}.jpg`
        }
    }
}