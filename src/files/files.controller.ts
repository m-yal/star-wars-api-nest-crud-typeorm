import { Controller, Delete, Get, Post, Query, StreamableFile, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { ApiDeleteFile, ApiDownloadFile, ApiUploadFiles } from './config/api-files-decorator.ts/api-files.decorators';
import { ParseFiles } from './pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';
import { UnitTypes } from 'src/types/types';
import { ExecutedResponseInterseptor } from 'src/interceptors/executed-response.interceptor';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {}

    @Get("")
    @ApiDownloadFile()
    getAll(@Query("imageName") imageName: string): StreamableFile {
        return new StreamableFile(this.fileService.getBy(imageName));
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("")
    @ApiUploadFiles("files", undefined, multerOptions)
    @UseInterceptors(ExecutedResponseInterseptor)
    addPerson(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("unitID") unitID: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.fileService.add(unitID, files, unitType);
    }

    @Delete("")
    @ApiDeleteFile()
    @UseInterceptors(ExecutedResponseInterseptor)
    deletePerson(@Query("imgName") imgName: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.fileService.delete(imgName, unitType);
    }
}