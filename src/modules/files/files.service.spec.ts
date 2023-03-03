import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import MockMulterFilesGenerator from "../crud/config/mocks/mock.multer.files.generator";
import { FilesService } from "./files.service";

describe("Files service", () => {
    let service: FilesService;
    let module: TestingModule;
    
    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                FilesService,
                {
                    provide: "SwapiImagesRepository",
                    useClass: MockImagesRepository,
                },
            ]
        }).compile();

        service = module.get<FilesService>(FilesService);
    });

    afterAll(async () => await module.close());

    it("to be defined", () => {
        expect(service).toBeDefined();
    })

    it("upload method should return filenames array", async () => {
        const files: Express.Multer.File[] = MockMulterFilesGenerator.generateImages(+faker.random.numeric(1));
        const expectedResult = files.map(file => file.filename);

        const result = await service.upload(files);

        expect(result).toEqual(expectedResult);
    })

    it("delete method should return true", async () => {
        const filename = faker.random.word() + ".jpg";

        expect(await service.delete(filename)).toEqual(true);
    })

    it("fileExists should return true", async () => {
        const filename = faker.random.word() + ".jpg";

        expect(await service.fileExists(filename)).toEqual(true);
    })
})

class MockImagesRepository {
    add = jest.fn().mockImplementation(async (files: Express.Multer.File[]): Promise<string[]> => {
        return files.map(file => file.filename);
    });

    delete = jest.fn().mockImplementation(async (fileName: string): Promise<boolean> => {
        return true;
    });

    fileExists = jest.fn().mockImplementation(async (fileName: string): Promise<boolean> => {
        return true;
    });
}