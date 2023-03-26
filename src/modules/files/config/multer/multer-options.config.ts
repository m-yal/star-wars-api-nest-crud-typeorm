import { UnsupportedMediaTypeException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

import { FileMymeTypeFilter } from "../../../../common/types/types";

function getFileMimetypeFilter(...mimetypes: string[]): FileMymeTypeFilter {
  return (req, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void,) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(new UnsupportedMediaTypeException(`File type is not matching: ${mimetypes.join(', ')}`), false);
    }
  };
}

export const multerInterceptorOptions: MulterOptions = {
  fileFilter: getFileMimetypeFilter('image'),
  limits: { fileSize: +process.env.MAX_FILE_SIZE_IN_MEGABYTES },
};