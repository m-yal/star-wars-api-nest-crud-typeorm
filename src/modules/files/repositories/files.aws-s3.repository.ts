import { AWSError, S3 } from 'aws-sdk';
import { Injectable, NotFoundException } from "@nestjs/common";
import internal from "stream";
import { PromiseResult } from 'aws-sdk/lib/request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { IAWSImagesRepository } from '../interfaces/repositories.interfaces';
import { FileNamesTransformer } from '../files.names.transformer';
import { File } from '../file.entity';
import { awsS3ClientConfig } from '../../../common/db.configs/aws-s3.config';

@Injectable()
export class AwsS3FilesRepository implements IAWSImagesRepository {

    private readonly AWS_PUBLIC_BUCKET_NAME = this.configService.get<string>(`NODE_ENV`) === "test" ? 
        this.configService.get<string>(`AWS_TEST_PUBLIC_BUCKET_NAME`) 
        : this.configService.get<string>(`AWS_PUBLIC_BUCKET_NAME`);
    private readonly s3 = this.getS3();

    constructor(
        @InjectRepository(File) private readonly filesRecordsReposiotry: Repository<File>,
        private readonly filenamesTrasformer: FileNamesTransformer,
        private readonly configService: ConfigService,
    ) { }

    async get(imageName: string): Promise<internal.Readable> {
        if (await this.fileExists(imageName)) {
            const options = this.getAwsS3GetOrDeleteOptions(imageName);
            return this.getS3().getObject(options).createReadStream();
        }
        throw new NotFoundException("Image in AWS was not found");
    }

    async add(images: Express.Multer.File[]): Promise<string[]> {
        this.filenamesTrasformer.rename(images);
        const awsResponses = images.map(image => {
            return this.s3.upload(this.generateUploadOptions(image)).promise();
        });
        await Promise.all(awsResponses);
        return this.filenamesTrasformer.extractFilenames(images);
    }

    async delete(imageName: string): Promise<true> {
        const options = this.getAwsS3GetOrDeleteOptions(imageName);
        try {
            await this.getS3().deleteObject(options).promise();
            const imageRecordToRemove = await this.filesRecordsReposiotry.findOneByOrFail({ name: imageName });
            await this.filesRecordsReposiotry.remove(imageRecordToRemove);
            return true;
        } catch (error) {
            throw new NotFoundException("File for deletion not found");
        }
    }

    async fileExists(fileName: string): Promise<boolean> {
        try {
            const options = this.getAwsS3GetOrDeleteOptions(fileName);
            await this.s3.headObject(options).promise();
            return true;
        } catch (error) {
            return false;
        }
    }

    async findByNames(fileNames: string[]): Promise<Partial<File>[]> {
        fileNames.map(filename => {
            const options = this.getAwsS3GetOrDeleteOptions(filename);
            const object = this.s3.headObject(options);
        });
        return fileNames.map((fileName) => ({ name: fileName }));
    }

    // https://ncoughlin.com/posts/aws-s3-delete-files-programatically/
    // WARNING: Can delete only up to 1,000 images from S3 storage!
    static async emptyBucket() {
        try {
            const listOfObjectsToDelete = await this.getListOfObjectsToDelete();
            await this.deleteAllObjectsInList(listOfObjectsToDelete);
        } catch (error) {
            console.log(error.message);
        }
    }




    private static async deleteAllObjectsInList(listOfObjectsToDelete: PromiseResult<S3.ListObjectsV2Output, AWSError>) {
        const deleteParams = {
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Delete: { Objects: [] }
        };
        listOfObjectsToDelete.Contents.forEach(({ Key }) => deleteParams.Delete.Objects.push({ Key }));
        new S3(awsS3ClientConfig).deleteObjects(deleteParams, (err: AWSError, data: S3.DeleteObjectOutput) => {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
        });
    }

    private static async getListOfObjectsToDelete() {
        const listOfObjectsToDelete = await new S3(awsS3ClientConfig).listObjectsV2({Bucket: process.env.AWS_PUBLIC_BUCKET_NAME}, (err: AWSError, data: S3.ListObjectsV2Output) => {
            if (err) {
                console.log("err: " + JSON.stringify(err));
                throw err;
            }
            
        }).promise();
        if (listOfObjectsToDelete.Contents.length === 0) throw new Error("No objects to delete form bucket");
        return listOfObjectsToDelete;
    }

    private generateUploadOptions(image: Express.Multer.File): S3.PutObjectRequest {
        return {
            Bucket: this.AWS_PUBLIC_BUCKET_NAME,
            Body: image.buffer,
            Key: image.filename
        };
    }

    private getAwsS3GetOrDeleteOptions(imageName: string) {
        return {
            Bucket: this.AWS_PUBLIC_BUCKET_NAME,
            Key: imageName
        };
    }

    private getS3(): S3 {
        return new S3(awsS3ClientConfig);
    }
}