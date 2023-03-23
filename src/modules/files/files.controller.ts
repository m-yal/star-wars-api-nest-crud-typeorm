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
    ) { }

    @Get()
    @DownloadFileDecorators()
    async get(@Query(`imageName`) imageName: string): Promise<StreamableFile> {
        return new StreamableFile(await this.fileService.get(imageName));
    }

    @Delete()
    @DeleteFileDecorators()
    delete(@Body() body: ImageNameDto): Promise<boolean> {
        return this.fileService.delete(body.imageName);
    }
}