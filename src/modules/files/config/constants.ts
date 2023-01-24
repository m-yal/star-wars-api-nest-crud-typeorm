import { config } from "dotenv"
import { FilesRepositoryType } from "src/common/types/types";
import { AwsS3FilesRepository } from "../repositories/files.aws-s3.repository";
import { FSFilesRepository } from "../repositories/files.fs.repository";

config();
const { env } = process;

export const FILES_REPOSITORY_TYPES_MAP = {
    [FilesRepositoryType.AWS]: AwsS3FilesRepository,
    [FilesRepositoryType.FS]: FSFilesRepository
};
export const ONE_MEGABYTE = 1024 * 1024;//bytes * kb
export const MAX_FILE_SIZE_IN_MEGABYTES = ONE_MEGABYTE * 5;
export const IMAGES_RELATIVE_FILE_PATH = env.IMAGES_RELATIVE_FILE_PATH;
export const FILES_STORAGE_TYPE = env.FILES_STORAGE_TYPE;