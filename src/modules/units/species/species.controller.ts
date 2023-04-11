import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles } from "@nestjs/common";

import { Specie } from "./species.entity";
import { SpeciesService } from "./species.service";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { SpeciesExistsPipe } from "./species.exists.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { PrepareSpeicesBodyPipe } from "./prepare-body.pipe";
import { CreateSpeciesDto } from "./create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { multerInterceptorOptions } from "../../files/config/multer/multer-options.config";
import { ParseFiles } from "../../files/config/pipes/parse-files.pipe";
import { UploadFilesDecorators } from "../../files/decorators/upload.decorators";
import { UpToTenUnitsPage } from "../../../common/types/types";
import { VERSION_HEADER, CURRENT_VERSION } from "../../../common/versioning/options";

@ApiTags("Species unit paths")
@ApiHeader({ name: VERSION_HEADER, schema: { default: CURRENT_VERSION } })
@Controller('species')
export class SpeciesController {

    constructor(
        private readonly speciesService: SpeciesService,
    ) { }

    @Post()
    @CreateUnitDecorators(CreateSpeciesDto)
    async create(
        @Body(PrepareSpeicesBodyPipe)
        dto: CreateSpeciesDto,
    ): Promise<Specie> {
        const specie: Specie = plainToInstance(Specie, { ...dto });
        return this.speciesService.create(specie);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1),)
        page: number,
    ): Promise<UpToTenUnitsPage<Specie>> {
        return this.speciesService.getUpToTen(page);
    }

    @Put()
    @UpdateUnitDecorators(CreateSpeciesDto)
    async update(
        @Body(SpeciesExistsPipe, PrepareSpeicesBodyPipe)
        dto: CreateSpeciesDto,
    ): Promise<Specie> {
        const specie: Specie = plainToInstance(Specie, { ...dto });
        return this.speciesService.update(specie);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateNamePipe)
        name: string,
    ): Promise<{ name: string }> {
        return this.speciesService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerInterceptorOptions)
    async uploadImages(
        @UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, 
        @Query("unitName") unitName: string
    ) {
        return this.speciesService.uploadImages(files, unitName);
    }
}