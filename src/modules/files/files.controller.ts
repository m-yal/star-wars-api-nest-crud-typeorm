import { Controller, Delete, Get, Post, Query, SetMetadata, StreamableFile, UploadedFiles, UseGuards, UseInterceptors, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { ApiDeleteFile, ApiDownloadFile, ApiUploadFiles } from './config/api-files-decorator.ts/api-files.decorators';
import { ParseFiles } from './pipes/parse-files.pipe';
import { multerOptions } from './config/multer/multer-options.config';
import { UnitTypes } from 'src/types/types';
import { ExecutedResponseInterseptor } from 'src/interceptors/executed-response.interceptor';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/modules/auth/entities/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags("Files paths")
@Controller('files')
export class FilesController {

    constructor(private readonly fileService: FilesService) {}

    @Get("")
    @ApiDownloadFile()
    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(RolesGuard)
    get(@Query("imageName") imageName: string): StreamableFile {
        return new StreamableFile(this.fileService.get(imageName));
    }

    //writted partially with a help of: https://notiz.dev/blog/type-safe-file-uploads
    @Post("")
    @ApiUploadFiles("files", undefined, multerOptions)
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @UseInterceptors(ExecutedResponseInterseptor)
    add(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("unitID") unitID: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.fileService.add(unitID, files, unitType);
    }

    @Delete("")
    @ApiDeleteFile()
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @UseInterceptors(ExecutedResponseInterseptor)
    delete(@Query("imgName") imgName: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.fileService.delete(imgName, unitType);
    }
}