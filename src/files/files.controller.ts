import { Controller, Delete, Get, Header, HttpStatus, Post, Query, Res, StreamableFile, UploadedFiles, } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiOperation({summary: "Get one image from one person"})
    @ApiResponse({
        schema: {
            type: "string",
            format: "binary"
        },
        status: HttpStatus.OK,
        description: "Got an image",
    })
    @ApiProduces('image/*')
    @Header("Content-type", "image/*")
    getAll(@Query("imgName") imgName: string, @Res({ passthrough: true }) response: Express.Response): StreamableFile {
        // const file = createReadStream(join(process.cwd() + "/files", imgName));
        return new StreamableFile(this.fileService.getBy(imgName));
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("people")
    @ApiUploadFiles("files", undefined, multerOptions)
    addPerson(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("id") id: string): Promise<StatusDto> {
        return this.fileService.add(id, files);
    }

    @Delete("people")
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiOperation({summary: "Remove single person`s image under image id"})
    deletePerson(@Query("imgName") imgName: string, @Query("id") id: string): StatusDto {
        return this.fileService.delete(imgName, id);
    }
}