import { UnsupportedMediaTypeException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { FileMymeTypeFilter } from "src/types/types";

const diskStorageOptions: multer.DiskStorageOptions = {
    destination: "files",
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

export const multerOptions: MulterOptions = {
    // dest: "files",
    // storage: diskStorage(diskStorageOptions),
    fileFilter: getFileMimetypeFilter('image'),
    limits: {fileSize: 1024 * 1024 * 5}, //bytes * kb * mb
    
}