import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, ValidationPipe } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { Films } from "./films.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilmsService } from "./films.service";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { FilmExistsPipe } from "./films.exists.pipe";
import { PrepareFilmBodyPipe } from "./prepare-body.pipe";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { ParseFiles } from "src/modules/files/config/pipes/parse-files.pipe";
import { multerOptions } from "src/modules/files/config/multer/multer-options.config";
import { UploadFilesDecorators } from "src/modules/files/decorators/upload.decorators";
import { CreateFilmDto } from "./create.dto";
import { plainToInstance } from "class-transformer";
import { CreatePeopleDto } from "../people/create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { DeletedDto } from "../config/dto/deleted.dto";

@ApiTags("Films unit path")
@Controller('film')
export class FilmsController {

    constructor(
        private readonly filmsService: FilmsService,
    ) { }
    
    @Post()
    @ApiOperation({ summary: 'Create film' })
    @CreateUnitDecorators(CreateFilmDto)
    async create(
        @Body(PrepareFilmBodyPipe)
        dto: CreateFilmDto
    ): Promise<Films> {
        const film: Films = plainToInstance(Films, { ...dto })
        return this.filmsService.create(film);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1)) 
        page: number
    ): Promise<UpToTenUnitsPage<Films>> {
        return this.filmsService.getUpToTen(page);
    }

    @Put()
    @ApiOperation({ summary: 'Update film' })
    @UpdateUnitDecorators(CreateFilmDto)
    async update(
        @Body(FilmExistsPipe, PrepareFilmBodyPipe)
        dto: CreateFilmDto,
    ): Promise<Films> {
        const film: Films = plainToInstance(Films, { ...dto });
        return this.filmsService.update(film);
    }

    @Delete(':name')
    @ApiOperation({ summary: 'Delete film by name' })
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateNamePipe)
        name: string,
    ): Promise<{ name: string }> {
        return this.filmsService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerOptions)
    async uploadImages(
        @UploadedFiles(ParseFiles, ValidationPipe) files: Array<Express.Multer.File>, 
        @Query("unitName") unitName: string
    ) {
        return this.filmsService.uploadImages(files, unitName);
    }
}