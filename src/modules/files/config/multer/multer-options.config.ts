import { UnsupportedMediaTypeException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { FileMymeTypeFilter, FilesRepositoryType } from "src/common/types/types";
import { FILES_STORAGE_TYPE, IMAGES_RELATIVE_FILE_PATH, MAX_FILE_SIZE_IN_MEGABYTES } from "../constants";

const diskStorageOptions: multer.DiskStorageOptions = {
    destination: IMAGES_RELATIVE_FILE_PATH,
    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.random() * 1e9}`;
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      callback(null, filename);
    }
}

function getFileMimetypeFilter(...mimetypes: string[]): FileMymeTypeFilter {
  return (req, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void,) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException(`File type is not matching: ${mimetypes.join(', ')}`), false);
    }
  };
}

export const multerOptions: MulterOptions = generateMulterOptions(); 

function generateMulterOptions(): MulterOptions {
  switch (FILES_STORAGE_TYPE) {
    case FilesRepositoryType.AWS:
      return {
        fileFilter: getFileMimetypeFilter('image'),
        limits: {fileSize: MAX_FILE_SIZE_IN_MEGABYTES},
      }
    case FilesRepositoryType.FS:
      return {
        storage: diskStorage(diskStorageOptions),
        fileFilter: getFileMimetypeFilter('image'),
        limits: {fileSize: MAX_FILE_SIZE_IN_MEGABYTES},
      }
    default:
      throw new Error(`Not supported files storage type: ${FILES_STORAGE_TYPE}`);
  }
}