import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { Films } from "./films.entity";
import { ApiOperation } from "@nestjs/swagger";
import { FilmsService } from "./films.service";
import { ValidateIdPipe } from "../config/pipes/validate-id.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { FilmExistsPipe } from "./films.exists.pipe";
import { PrepareFilmBodyPipe } from "./film.prepare-body.pipe";
import { CreateUnitDecorators } from "../config/decorators/createUnit.decorator";
import { GetUpToTenUnitsDecorators } from "../config/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../config/decorators/update.decorator";
import { DeleteUnitDecorators } from "../config/decorators/delete.decorator";

@Controller('film')
export class FilmsController {

    constructor(
        private readonly filmsService: FilmsService,
    ) { }
    
    @Post()
    @ApiOperation({ summary: 'Create film' })
    @CreateUnitDecorators(new Films())
    async create(
        @Body(PrepareFilmBodyPipe)
        film: Films
    ): Promise<Films> {
        return this.filmsService.create(film);
    }

    @Get()
    @ApiOperation({ summary: 'Get up to 10 films, sorted by last added' })
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1)) 
        page: number
    ): Promise<UpToTenUnitsPage<Films>> {
        return this.filmsService.getUpToTen(page);
    }

    @Get(':name')
    @ApiOperation({ summary: 'Get film by name' })
    @GetUpToTenUnitsDecorators()
    async findOne(
        @Param('name', ValidateIdPipe, FilmExistsPipe) 
        name: string
    ): Promise<Films> {
        return this.filmsService.findOne(name);
    }

    @Put(':name')
    @ApiOperation({ summary: 'Update film' })
    @UpdateUnitDecorators(new Films())
    async update(
        @Param('name', ValidateIdPipe, FilmExistsPipe)
        name: string,
        @Body(PrepareFilmBodyPipe)
        film: Films,
    ): Promise<true> {
        return this.filmsService.update(name, film);
    }

    @Delete('name')
    @ApiOperation({ summary: 'Delete film by name' })
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateIdPipe, FilmExistsPipe)
        name: string,
    ): Promise<true> {
        return this.filmsService.delete(name);
    }
}