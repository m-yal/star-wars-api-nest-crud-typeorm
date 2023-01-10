import { Controller, Delete, Get, Post, Query, StreamableFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { ParseFiles } from './config/pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';
import { UnitTypes } from 'src/common/types/types';
import { DownloadFileDecorators } from './config/decorators/download.decorators';
import { UploadFilesDecorators } from './config/decorators/upload.decorators';
import { DeleteFileDecorators } from './config/decorators/delete.decorators';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) { }

    @Get("")
    @DownloadFileDecorators()
    get(@Query("imageName") imageName: string): StreamableFile {
        return new StreamableFile(this.fileService.get(imageName));
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("")
    @UploadFilesDecorators("files", undefined, multerOptions)
    add(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("unitID") unitID: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.fileService.add(unitID, files, unitType);
    }

    @Delete("")
    @DeleteFileDecorators()
    delete(@Query("imgName") imgName: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.fileService.delete(imgName, unitType);
    }
}