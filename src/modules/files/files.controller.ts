import { Body, Controller, Delete, Get, Inject, Query, StreamableFile } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { FilesService } from './files.service';
import { DownloadFileDecorators } from './decorators/download.decorators';
import { DeleteFileDecorators } from './decorators/delete.decorators';
import { ImageNameDto } from './dto/image.name.dto';
import { FilesInjectionToken } from './injection.tokens';
import { VERSION_HEADER, CURRENT_VERSION } from '../../common/versioning/options';

@ApiTags("Files paths")
@ApiHeader({ name: VERSION_HEADER, schema: { default: CURRENT_VERSION } })
@Controller('files')
export class FilesController {

    constructor(
        @Inject(FilesInjectionToken.FILES_ACTIONS) private readonly fileService: FilesService,
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