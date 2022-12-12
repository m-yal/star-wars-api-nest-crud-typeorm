import { Controller, Delete, Get, Post, Query, StreamableFile, UploadedFiles, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { ApiDeleteFile, ApiDownloadFile, ApiUploadFiles } from './config/api-files-decorator.ts/api-files.decorators';
import { ParseFiles } from './pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';
import { UnitTypeEnum, UnitTypes } from 'src/crud/types/types';
import { ExecutedDto } from 'src/crud/dto/executed.dto';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {}

    @Get("people")
    @ApiDownloadFile()
    getAll(@Query("imageName") imageName: string): StreamableFile {
        return new StreamableFile(this.fileService.getBy(imageName));
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("people")
    @ApiUploadFiles("files", undefined, multerOptions)
    addPerson(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("unitID") unitID: string, @Query("unitType") unitType: UnitTypes): Promise<ExecutedDto> {
        return this.fileService.add(unitID, files, unitType);
    }

    @Delete("people")
    @ApiDeleteFile()
    deletePerson(@Query("imgName") imgName: string, @Query("unitType") unitType: UnitTypes): Promise<ExecutedDto> {
        return this.fileService.delete(imgName, unitType);
    }
}