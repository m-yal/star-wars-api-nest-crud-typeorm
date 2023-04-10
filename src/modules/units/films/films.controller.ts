import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

import { Film } from "./films.entity";
import { FilmsService } from "./films.service";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { FilmExistsPipe } from "./films.exists.pipe";
import { PrepareFilmBodyPipe } from "./prepare.film.body.pipe";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { CreateFilmDto } from "./create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { UpToTenUnitsPage } from "../../../common/types/types";
import { multerInterceptorOptions } from "../../files/config/multer/multer-options.config";
import { ParseFiles } from "../../files/config/pipes/parse-files.pipe";
import { UploadFilesDecorators } from "../../files/decorators/upload.decorators";

@ApiTags("Films unit path")
@Controller('film')
export class FilmsController {

    constructor(
        private readonly filmsService: FilmsService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(CreateFilmDto)
    async create(
        @Body(PrepareFilmBodyPipe)
        dto: CreateFilmDto
    ): Promise<Film> {
        const film: Film = plainToInstance(Film, { ...dto });
        return this.filmsService.create(film);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    async getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1)) 
        page: number
    ): Promise<UpToTenUnitsPage<Film>> {
        return this.filmsService.getUpToTen(page);
    }

    @Put()
    @ApiOperation({ summary: 'Update film' })
    @UpdateUnitDecorators(CreateFilmDto)
    async update(
        @Body(FilmExistsPipe, PrepareFilmBodyPipe)
        dto: CreateFilmDto,
    ): Promise<Film> {
        const film: Film = plainToInstance(Film, { ...dto });
        return this.filmsService.update(film);
    }

    @Delete(':name')
    @ApiOperation({ summary: 'Delete film by name' })
    @DeleteUnitDecorators()
    async remove(
        @Param('name', FilmExistsPipe)
        name: string,
    ): Promise<{ name: string }> {
        return this.filmsService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerInterceptorOptions)
    async uploadImages(
        @UploadedFiles(ParseFiles, ValidationPipe) files: Array<Express.Multer.File>, 
        @Query("unitName") unitName: string
    ) {
        return this.filmsService.uploadImages(files, unitName);
    }
}   