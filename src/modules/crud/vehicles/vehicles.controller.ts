import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { VehiclesService } from "./vehicles.service";
import { Vehicles } from "./vehicles.entity";
import { CreateUnitDecorators } from "../config/decorators/createUnit.decorator";
import { GetUpToTenUnitsDecorators } from "../config/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../config/decorators/update.decorator";
import { DeleteUnitDecorators } from "../config/decorators/delete.decorator";
import { ValidateIdPipe } from "../config/pipes/validate-id.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { VehicleExistsPipe } from "./vehicles.exists.pipe";
import { PrepareVehiclesBodyPipe } from "./vehicles.prepare-body.pipe";

@Controller('vehicles')
export class VehiclesController {

    constructor(
        private readonly vehiclesService: VehiclesService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(new Vehicles())
    async create(
        @Body(PrepareVehiclesBodyPipe) 
        starship: Vehicles,
    ): Promise<Vehicles> {
        return this.vehiclesService.create(starship);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe) 
        page: number,
    ): Promise<UpToTenUnitsPage<Vehicles>> {
        return this.vehiclesService.getUpToTen(page);
    }

    @Put(':name')
    @UpdateUnitDecorators(new Vehicles())
    async update(
        @Param('name', ValidateIdPipe, VehicleExistsPipe) 
        name: string,
        @Body(PrepareVehiclesBodyPipe) 
        vehicle: Vehicles,
    ): Promise<true> {
        return this.vehiclesService.update(name, vehicle);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateIdPipe, VehicleExistsPipe) 
        name: string
    ): Promise<true> {
        return this.vehiclesService.delete(name);
    }
}