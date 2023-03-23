import { Test, TestingModule } from "@nestjs/testing";
import { Files } from "../file.entity";
import { FSFilesRepository } from "./files.fs.repository"
import { PathLike, unlinkSync, writeFileSync, readFileSync } from 'fs';
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileNamesTransformer } from "../files.names.transformer";
import { join } from "path";

describe("Files FS repository", () => {
    let repository: FSFilesRepository;
    let module: TestingModule;
    let configService: ConfigService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                FSFilesRepository,
                {
                    provide: getRepositoryToken(Files),
                    useValue: {},
                },
                FileNamesTransformer,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(key => {
                            switch (key) {
                                case `TEST_IMAGE_PATH`: return `./test/test-files/sample.jpg`;
                                case `IMAGES_RELATIVE_FILE_PATH`: return `images`;
                                default: return undefined;
                            }
                        }),
                    },
                },
            ]
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
        repository = module.get<FSFilesRepository>(FSFilesRepository);
    })

    afterAll(async () => {
        await module.close();
    })

    it("to be defined", () => {
        expect(repository).toBeDefined();
    })

    it("get method throws NotFoundException for wrong input image name", async () => {
        const imageName: string = "wrongName.jpg";

        try {
            await repository.get(imageName);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException("Image in FS was not found"));
        }
    })

    it(`delete should return 404 with message: "File for deletion not found"`, async () => {
        const imageName: string = "wrongName.jpg";

        try {
            await repository.delete(imageName);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException('File for deletion not found'));
        }
    })

    it("fileExists method returns true, becuase file with name 'sample.jpg' exists", async () => {
        const filename = "sample.jpg";
        copyImage(filename);

        try {
            expect(await repository.fileExists(filename)).toEqual(true);
        } finally {
            deleteImageFromFS(filename);
        }
    })

    it("fileExists method returns false", async () => {
        const filename = "test1.jpg";

        expect(await repository.fileExists(filename)).toEqual(false);
    })





    function copyImage(destFileName: string) {
        const sourceImage = join(configService.get<string>(`TEST_IMAGE_PATH`));
        const destinationImage = join(configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`), destFileName);

        return writeFileSync(destinationImage, readFileSync(sourceImage));
    }

    function deleteImageFromFS(imageName: string) {
        const dirName = configService.get<string>(`IMAGES_RELATIVE_FILE_PATH`);
        const path: PathLike = join(dirName, imageName);
        unlinkSync(path);
    }
})