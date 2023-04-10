import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { File } from "../file.entity";

export class RandomMockImagesGenerator {

    generateSeveralRecords(amount: number): File[] {
        const images: File[] = [];
        for (let i = 0; i < amount; i++) {
            images.push(this.generateOneRecord());
        }
        return images;
    }

    generateOneRecord(): File {
        return plainToInstance(File, {
            id: +faker.random.numeric(3),
            name: faker.random.word() + ".jpg"
        })
    }
}