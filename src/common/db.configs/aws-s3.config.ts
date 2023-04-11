import { S3 } from "aws-sdk";
import { config } from "dotenv";

config();
const { env } = process;
const isTestEnvironment: boolean = env.NODE_ENV === "test";

export const awsS3ClientConfig: S3.ClientConfiguration = isTestEnvironment ? {
        accessKeyId: env.AWS_TEST_ACCESS_KEY_ID,
        secretAccessKey:  env.AWS_TEST_SECRET_ACCESS_KEY,
        region: env.AWS_TEST_REGION,
    } : {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
    };