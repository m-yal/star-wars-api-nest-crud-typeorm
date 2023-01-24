import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { PlanetsService } from "./planets.service";
import { Planets } from "./planets.entity";
import { GetUpToTenUnitsDecorators } from "../config/decorators/get-up-to-ten.decorator";
import { DeleteUnitDecorators } from "../config/decorators/delete.decorator";
import { UpdateUnitDecorators } from "../config/decorators/update.decorator";
import { CreateUnitDecorators } from "../config/decorators/createUnit.decorator";
import { ValidateIdPipe } from "../config/pipes/validate-id.pipe";
import { PreparePlanetBodyPipe } from "./planets.prepare-body.pipe";
import { VehicleExistsPipe } from "../vehicles/vehicles.exists.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";

@Controller('planets')
export class PlanetsController {

    constructor(
        private readonly planetsService: PlanetsService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(new Planets())
    async create(
        @Body(PreparePlanetBodyPipe) 
        planet: Planets,
    ): Promise<Planets> {
        return this.planetsService.create(planet);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1), ParseIntPipe) 
        page: number,
    ): Promise<UpToTenUnitsPage<Planets>> {
        return this.planetsService.getUpToTen(page);
    }

    @Put(':name')
    @UpdateUnitDecorators(new Planets())
    async update(
        @Param('name', ValidateIdPipe, VehicleExistsPipe) 
        name: string,
        @Body(PreparePlanetBodyPipe) 
        planet: Planets,
    ): Promise<true> {
        return this.planetsService.update(name, planet);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateIdPipe, VehicleExistsPipe) 
        name: string,
    ): Promise<true> {
        return this.planetsService.delete(name);
    }
}