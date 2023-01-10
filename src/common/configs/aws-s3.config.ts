import { S3 } from "aws-sdk";
import { config } from "dotenv";

config();

export const awsS3ClientConfig: S3.ClientConfiguration = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, 
};