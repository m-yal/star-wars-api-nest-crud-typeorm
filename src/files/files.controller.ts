import { Controller, Delete, Get, Post, Query, Res, StreamableFile, UploadedFiles, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusDto } from './dto/status.dto';
import { FilesService } from './files.service';
import { ApiDeleteFile, ApiDownloadFile, ApiUploadFiles } from './config/api-files-decorator.ts/api-files.decorators';
import { ParseFiles } from './pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {}

    @Get("people")
    @ApiDownloadFile()
    getAll(@Query("imgName") imgName: string): StreamableFile {
        return new StreamableFile(this.fileService.getBy(imgName));
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("people")
    @ApiUploadFiles("files", undefined, multerOptions)
    addPerson(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("id") id: string): Promise<StatusDto> {
        return this.fileService.add(id, files);
    }

    @Delete("people")
    @ApiDeleteFile()
    deletePerson(@Query("imgName") imgName: string, @Query("id") id: string): StatusDto {
        return this.fileService.delete(imgName, id);
    }
}