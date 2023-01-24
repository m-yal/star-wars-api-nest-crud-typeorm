import { S3 } from "aws-sdk";
import { config } from "dotenv";

config();
const { env } = process;

export const awsS3ClientConfig: S3.ClientConfiguration = {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
};