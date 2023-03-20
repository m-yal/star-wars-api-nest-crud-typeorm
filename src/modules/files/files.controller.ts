import { Body, Controller, Delete, Get, Inject, Query, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { DownloadFileDecorators } from './decorators/download.decorators';
import { DeleteFileDecorators } from './decorators/delete.decorators';
import { ImageNameDto } from './dto/image.name.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(
        @Inject("IFilesActions") private readonly fileService: FilesService,
        private readonly configService: ConfigService,
        ) { }

    @Get()
    @DownloadFileDecorators()
    get(@Body() body: ImageNameDto): StreamableFile {
        return new StreamableFile(this.fileService.get(body.imageName));
    }

    @Delete()
    @DeleteFileDecorators()
    delete(@Body() body: ImageNameDto): Promise<boolean> {
        return this.fileService.delete(body.imageName);
    }
}