import { Test, TestingModule } from "@nestjs/testing";
import { Files } from "../entities/file.entity";
import { PathLike, unlinkSync, writeFileSync, readFileSync } from 'fs';
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileNamesTransformer } from "../files.names.transformer";
import { join } from "path";
import { AwsS3FilesRepository } from "./files.aws-s3.repository";
import { RandomMockImagesGenerator } from "../mocks/mock.random.images.generator";
import { faker } from "@faker-js/faker";

describe("Files AWS repository", () => {
    let repository: AwsS3FilesRepository;
    let module: TestingModule;
    let configService: ConfigService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                AwsS3FilesRepository,
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
                                default: return undefined;
                            }
                        }),
                    },
                },
            ]
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
        repository = module.get<AwsS3FilesRepository>(AwsS3FilesRepository);
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

    it("fileExists method returns false", async () => {
        const filename = "test1.jpg";

        expect(await repository.fileExists(filename)).toEqual(false);
    })
})