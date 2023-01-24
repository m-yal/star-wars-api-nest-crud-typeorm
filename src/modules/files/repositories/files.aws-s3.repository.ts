import { S3 } from 'aws-sdk';
import { Injectable } from "@nestjs/common";
import internal from "stream";
import { awsS3ClientConfig } from "src/common/db.configs/aws-s3.config";
import { IAWSImagesRepository } from '../interfaces/repositories.interfaces';
import { FileNamesTransformer } from '../files.names.transformer';

@Injectable()
export class AwsS3FilesRepository implements IAWSImagesRepository {

    private readonly AWS_PUBLIC_BUCKET_NAME = process.env.AWS_PUBLIC_BUCKET_NAME;
    private readonly fileNamesTransformer = new FileNamesTransformer();

    get(imageName: string): internal.Readable {
        const options = this.getAwsS3GetOrDeleteOptions(imageName);
        return this.getS3().getObject(options).createReadStream();
    }

    async add(images: Express.Multer.File[]): Promise<string[]> {
        this.fileNamesTransformer.rename(images);
        const s3 = this.getS3();
        const awsResponses = images.map(image => {
            return s3.upload(this.generateUploadOptions(image)).promise();
        });
        await Promise.all(awsResponses);
        return this.fileNamesTransformer.extractFilenames(images);
    }

    async delete(imgName: string): Promise<true> {
        const options = this.getAwsS3GetOrDeleteOptions(imgName);
        const deleteResponses = [];
        this.getS3().deleteObject(options).promise().then((value) => {
            deleteResponses.push(value);
        });
        Promise.all(deleteResponses).then((values) => {
            console.log("awsResponses: " + JSON.stringify(values));
        });
        return true;
    }

    async fileExists(fileName: string): Promise<boolean> {
        try {
            const s3 = this.getS3();
            const options = this.getAwsS3GetOrDeleteOptions(fileName);
            const object = s3.headObject(options);
            console.log("object headObject: " + JSON.stringify(object));
            return true;
        } catch (e) {
            return false;
        }
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        const s3 = this.getS3();
        fileNames.map(filename => {
            const options = this.getAwsS3GetOrDeleteOptions(filename);
            const object = s3.headObject(options);
            console.log("object headObject: " + JSON.stringify(object));
        });
        return fileNames.map((fileName) => ({ name: fileName }));
    }





    private generateUploadOptions(image: Express.Multer.File): S3.PutObjectRequest {
        return {
            Bucket: this.AWS_PUBLIC_BUCKET_NAME,
            Body: image.buffer,
            Key: image.filename
        };
    }

    private getAwsS3GetOrDeleteOptions(imgName: string) {
        return {
            Bucket: this.AWS_PUBLIC_BUCKET_NAME,
            Key: imgName
        };
    }

    private getS3(): S3 {
        return new S3(awsS3ClientConfig);
    }
}