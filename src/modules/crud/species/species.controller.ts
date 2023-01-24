import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { Species } from "./species.entity";
import { SpeciesService } from "./species.service";
import { CreateUnitDecorators } from "../config/decorators/createUnit.decorator";
import { GetUpToTenUnitsDecorators } from "../config/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../config/decorators/update.decorator";
import { DeleteUnitDecorators } from "../config/decorators/delete.decorator";
import { ValidateIdPipe } from "../config/pipes/validate-id.pipe";
import { SpeciesExistsPipe } from "./species.exists.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { PrepareSpeicesBodyPipe } from "./species.prepare-body.pipe";

@Controller('species')
export class SpeciesController {

    constructor(
        private readonly speciesService: SpeciesService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(new Species())
    async create(
        @Body(PrepareSpeicesBodyPipe) 
        specie: Species,
    ): Promise<Species> {
        return this.speciesService.create(specie);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1),) 
        page: number,
    ): Promise<UpToTenUnitsPage<Species>> {
        return this.speciesService.getUpToTen(page);
    }

    @Put(':name')
    @UpdateUnitDecorators(new Species())
    async update(
        @Param('name', ValidateIdPipe, SpeciesExistsPipe) 
        name: string,
        @Body(PrepareSpeicesBodyPipe) 
        specie: Species,
    ): Promise<true> {
        return this.speciesService.update(name, specie);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateIdPipe, SpeciesExistsPipe) 
        name: string,
    ): Promise<true> {
        return this.speciesService.delete(name);
    }
}