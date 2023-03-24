import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { Files } from "../entities/file.entity";

export class RandomMockImagesGenerator {

    generateSeveralRecords(amount: number): Files[] {
        const images: Files[] = [];
        for (let i = 0; i < amount; i++) {
            images.push(this.generateOneRecord());
        }
        return images;
    }

    generateOneRecord(): Files {
        return plainToInstance(Files, {
            id: +faker.random.numeric(3),
            name: faker.random.word() + ".jpg"
        })
    }
}