import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles } from "@nestjs/common";

import { PlanetsService } from "./planets.service";
import { Planet } from "./planets.entity";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { PreparePlanetBodyPipe } from "./prepare-body.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { CreatePlanetDto } from "./create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { PlanetExistsPipe } from "./planets.exists.pipe";
import { multerInterceptorOptions } from "../../files/config/multer/multer-options.config";
import { ParseFiles } from "../../files/config/pipes/parse-files.pipe";
import { UploadFilesDecorators } from "../../files/decorators/upload.decorators";
import { UpToTenUnitsPage } from "../../../common/types/types";
import { VERSION_HEADER, CURRENT_VERSION } from "../../../common/versioning/options";

@ApiTags("Planets unit paths")
@ApiHeader({ name: VERSION_HEADER, schema: { default: CURRENT_VERSION } })
@Controller('planets')
export class PlanetsController {

    constructor(
        private readonly planetsService: PlanetsService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(CreatePlanetDto)
    async create(
        @Body(PreparePlanetBodyPipe) 
        dto: CreatePlanetDto,
    ): Promise<Planet> {
        const planet: Planet = plainToInstance(Planet, { ...dto })
        return this.planetsService.create(planet);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1), ParseIntPipe) 
        page: number,
    ): Promise<UpToTenUnitsPage<Planet>> {
        return this.planetsService.getUpToTen(page);
    }

    @Put()
    @UpdateUnitDecorators(CreatePlanetDto)
    async update(
        @Body(PlanetExistsPipe, PreparePlanetBodyPipe) 
        dto: CreatePlanetDto,
    ): Promise<Planet> {
        const planet: Planet = plainToInstance(Planet, { ...dto })
        return this.planetsService.update(planet);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateNamePipe) 
        name: string,
    ): Promise<{ name: string }> {
        return this.planetsService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerInterceptorOptions)
    async uploadImages(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("unitName") unitName: string) {
        return this.planetsService.uploadImages(files, unitName);
    }
}