import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm/repository/Repository";
import { Files } from "../file.entity";
import { FSFilesRepository } from "./files.fs.repository"
import * as fs from 'fs';
import { createReadStream } from "fs";
import { join } from "path";
import { getRepositoryToken } from "@nestjs/typeorm";
import { config } from "dotenv";
import { NotFoundException } from "@nestjs/common";

config();


describe("Files FS repository", () => {
    let repository: FSFilesRepository;
    let module: TestingModule;
    
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                FSFilesRepository,
                {
                    provide: getRepositoryToken(Files),
                    useClass: MockFilesRecordsRepository,
                },
            ]
        }).compile();

        repository = module.get<FSFilesRepository>(FSFilesRepository);
    })

    afterAll(async () => {
        await module.close();
    })

    it("to be defined", () => {
        expect(repository).toBeDefined();
    })

    it("get method throws NotFoundException for wrong input image name", () => {
        const imageName: string = "wrongName.jpg";

        try {
            repository.get(imageName);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException("Image in FS was not found"));
        }
    })

    it("delete", async () => {
        const imageName: string = "wrongName.jpg";
        
        try {
            await repository.delete(imageName);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error).toEqual(new NotFoundException('File for deletion not found'));
        }
    })

    it("fileExists method returns true, becuase file with name 'test.jpg' exists", async () => {
        const filename = "test.jpg";

        expect(repository.fileExists(filename)).toBe(true);
    })

    it("fileExists method returns false", async () => {
        const filename = "test1.jpg";

        expect(repository.fileExists(filename)).toBe(false);
    })
})

class MockFilesRecordsRepository {

}