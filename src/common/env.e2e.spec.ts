import { config } from "dotenv";

config();

describe(`.env`, () => {
    describe("Correct required constants presence", () => {
        it("all variables are not empty", () => {
            const variables: string[] = [
                "API_PORT", "DB_HOST", "DB_NAME", "TEST_DB_NAME",
                "DB_PORT", "DB_USERNAME", "DB_PASSWORD", "FILES_STORAGE_TYPE",
                "IMAGES_RELATIVE_FILE_PATH", "AWS_PUBLIC_BUCKET_NAME",
                "AWS_REGION", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY",
                "ENTITIES_PROJECT_PATH", "MIGRATION_PROJECT_PATH",
                "SWAGGER_MAIN_DOC_TITLE", "SWAGGER_MAIN_DOC_DESCRIPTION",
                "SWAGGER_VERSION", "SESSION_COOKIES_MAX_AGE",
                "SESSION_SECRET", "ADMIN_USER_LOGIN", "ADMIN_USER_PASSWORD",
            ];
            for (const variable of variables) {
                const value = process.env[variable];
                expect(value).toBeDefined();
                expect(value).not.toEqual("");
            }
        })
        it("FILES_STORAGE_TYPE .env variable should be 'FS' or 'AWS'", () => {
            const fileStorageType = process.env.FILES_STORAGE_TYPE;
            expect((fileStorageType === "FS" || fileStorageType === "AWS")).toEqual(true);
        })
        it(`API_PORT should be numeric and between inclusively 1025 and 65535`, () => {
            const apiPort = +process.env.API_PORT;
            expect(apiPort).toBeLessThanOrEqual(65535);
            expect(apiPort).toBeGreaterThanOrEqual(1025);
        })
        it(`values should be integer: API_PORT, DB_PORT, SESSION_COOKIES_MAX_AGE`, () => {
            const variables = ["API_PORT", "DB_PORT", "SESSION_COOKIES_MAX_AGE"];
            for (const variable of variables) {
                const value = process.env[variable];
                expect(Number.isInteger(+value)).toEqual(true);
            }
        })

        it("SESSION_COOKIES_MAX_AGE is above zero", () => {
            expect(+process.env.SESSION_COOKIES_MAX_AGE > 0).toEqual(true);
        })
    })
})


