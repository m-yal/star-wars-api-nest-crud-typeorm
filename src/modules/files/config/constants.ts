import { FilesRepositoryType } from "../../../common/types/types";
import { AwsS3FilesRepository } from "../repositories/files.aws-s3.repository";
import { FSFilesRepository } from "../repositories/files.fs.repository";

export const FILES_REPOSITORY_TYPES_MAP = {
    [FilesRepositoryType.AWS]: AwsS3FilesRepository,
    [FilesRepositoryType.FS]: FSFilesRepository
};