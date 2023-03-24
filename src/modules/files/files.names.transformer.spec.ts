import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing"
import { MockMulterFilesGenerator } from "../crud/config/mocks/mock.multer.files.generator";
import { FileNamesTransformer } from "./files.names.transformer";

describe("File names transformer", () => {
    let module: TestingModule;
    let transformer: FileNamesTransformer;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                FileNamesTransformer,
            ]
        }).compile();

        transformer = module.get<FileNamesTransformer>(FileNamesTransformer);
    })

    afterAll(async () => await module.close());

    it("to be defined", () => {
        expect(transformer).toBeDefined();
    })

    it("extractFilenames method should return string[]", () => {
        const files = MockMulterFilesGenerator.generateImages(+faker.random.numeric(1));
        const expectedResult = files.map(file => file.filename);
        
        const result = transformer.extractFilenames(files);

        expect(result).toEqual(expectedResult);
    })
})