import { config } from "dotenv"
import { FilesRepositoryType } from "src/common/types/types";
import { AwsS3FilesRepository } from "../files.aws-s3.repository";
import { FSFilesRepository } from "../files.fs.repository";

config();

export const filesRepositoryTypesMap = {
    [FilesRepositoryType.AWS]: AwsS3FilesRepository,
    [FilesRepositoryType.FS]: FSFilesRepository
};
export const ONE_MEGABYTE = 1024 * 1024;//bytes * kb
export const MAX_FILE_SIZE_IN_MEGABYTES = ONE_MEGABYTE * 5;
export const IMAGES_RELATIVE_FILE_PATH = process.env.IMAGES_RELATIVE_FILE_PATH;
export const FILES_STORAGE_TYPE = process.env.FILES_STORAGE_TYPE;