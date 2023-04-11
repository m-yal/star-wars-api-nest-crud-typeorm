import { plainToInstance } from "class-transformer";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles } from "@nestjs/common";

import { VehiclesService } from "./vehicles.service";
import { Vehicle } from "./vehicles.entity";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { VehicleExistsPipe } from "./vehicles.exists.pipe";
import { PrepareVehiclesBodyPipe } from "./prepare-body.pipe";
import { CreateVehicleDto } from "./create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { multerInterceptorOptions } from "../../files/config/multer/multer-options.config";
import { ParseFiles } from "../../files/config/pipes/parse-files.pipe";
import { UploadFilesDecorators } from "../../files/decorators/upload.decorators";
import { UpToTenUnitsPage } from "../../../common/types/types";
import { VERSION_HEADER, CURRENT_VERSION } from "../../../common/versioning/options";

@ApiTags("Vehicles unit paths")
@ApiHeader({ name: VERSION_HEADER, schema: { default: CURRENT_VERSION } })
@Controller('vehicles')
export class VehiclesController {

    constructor(
        private readonly vehiclesService: VehiclesService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(CreateVehicleDto)
    async create(
        @Body(PrepareVehiclesBodyPipe) 
        dto: CreateVehicleDto,
    ): Promise<Vehicle> {
        const vehicle: Vehicle = plainToInstance(Vehicle, { ...dto });
        return this.vehiclesService.create(vehicle);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe) 
        page: number,
    ): Promise<UpToTenUnitsPage<Vehicle>> {
        return this.vehiclesService.getUpToTen(page);
    }

    @Put()
    @UpdateUnitDecorators(CreateVehicleDto)
    async update(
        @Body(VehicleExistsPipe, PrepareVehiclesBodyPipe) 
        dto: CreateVehicleDto,
    ): Promise<Vehicle> {
        const vehicle: Vehicle = plainToInstance(Vehicle, { ...dto });
        return this.vehiclesService.update(vehicle);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateNamePipe) 
        name: string
    ): Promise<{ name: string }> {
        return this.vehiclesService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerInterceptorOptions)
    async uploadImages(
        @UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, 
        @Query("unitName") unitName: string
    ) {
        return this.vehiclesService.uploadImages(files, unitName);
    }
}