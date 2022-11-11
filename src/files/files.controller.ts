import { Controller, Delete, Get, HttpStatus, Post, Query, UploadedFiles, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from './dto/status.dto';
import { ImagesDto } from './dto/images.dto';
import { FilesService } from './files.service';
import { ApiUploadFiles } from './config/api-files-decorator.ts/api-files.decorator';
import { ParseFiles } from './pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {}

    @Get("people")
    @ApiOperation({summary: "Get all person`s images"})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Got all person`s images",
        type: ImagesDto
    })
    getAll(@Query("id") id: string): ImagesDto {
        return this.fileService.getBy(id);
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("people")
    @ApiUploadFiles("files", 10, multerOptions)
    addPerson(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("id") id: string): StatusDto {
        console.log(`images for id ${id}: ${files}`);        
        return {executed: true};
    }

    @Delete("people")
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiOperation({summary: "Remove single person`s image under image id"})
    deletePerson(@Query("imgId") imgId: string): StatusDto {
        return this.fileService.delete(imgId);
    }
}