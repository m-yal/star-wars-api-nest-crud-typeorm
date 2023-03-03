import { Controller, Delete, Get, Inject, Post, Query, StreamableFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { ParseFiles } from './config/pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';
import { DownloadFileDecorators } from './decorators/download.decorators';
import { UploadFilesDecorators } from './decorators/upload.decorators';
import { DeleteFileDecorators } from './decorators/delete.decorators';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(@Inject("IFilesActions") private readonly fileService: FilesService) { }

    @Get("")
    @DownloadFileDecorators()
    get(@Query("imageName") imageName: string): StreamableFile {
        return new StreamableFile(this.fileService.get(imageName));
    }

    @Delete("")
    @DeleteFileDecorators()
    delete(@Query("imageName") imageName: string): Promise<boolean> {
        return this.fileService.delete(imageName);
    }
}