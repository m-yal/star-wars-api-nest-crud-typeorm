import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { FileNamesTransformer } from "../files.names.transformer";
import { AwsS3FilesRepository } from "./files.aws-s3.repository";
import { File } from "../file.entity";

jest.setTimeout(50000);

describe("Files AWS repository", () => {
    let repository: AwsS3FilesRepository;
    let module: TestingModule;
    let configService: ConfigService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                AwsS3FilesRepository,
                {
                    provide: getRepositoryToken(File),
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
            expect(error).toEqual(new NotFoundException("Image in AWS was not found"));
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