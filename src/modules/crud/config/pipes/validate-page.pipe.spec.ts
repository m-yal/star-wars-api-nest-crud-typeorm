import { BadRequestException, HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ValidatePagePipe } from "./validate-page.pipe";

describe("Validate page value pipe, which validates corectness of input page value: integer and above 0", () => {
    let pipe: ValidatePagePipe;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                ValidatePagePipe,
            ]
        }).compile();

        pipe = module.get<ValidatePagePipe>(ValidatePagePipe);
    })

    afterAll(async () => {
        await module.close();
    })

    it("transform should return input integer value ", async () => {
        const page = 1;

        const result = await pipe.transform(page);

        expect(result).toEqual(page);
    })

    it("transform should throw BadRequestException because input value is below or equal 0 ", async () => {
        const inputValues: number[] = [0, -1];
        for await (const value of inputValues) {
            try {
                await pipe.transform(value);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error).toEqual(new BadRequestException("Page value is below or equals to 0"));
            }
        }
    })

    it("tranform method should throw BadRequestException because input value is not integer", async () => {
        const inputValues: any = ["1", "aaa", {}, null, undefined, 1.1, -1.1];
        for await (const value of inputValues) {
            try {
                await pipe.transform(value);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error).toEqual(new BadRequestException("Page value is not integer"));
            }
        }
    })
})