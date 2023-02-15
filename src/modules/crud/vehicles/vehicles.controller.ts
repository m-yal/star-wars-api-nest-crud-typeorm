import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { VehiclesService } from "./vehicles.service";
import { Vehicles } from "./vehicles.entity";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { VehicleExistsPipe } from "./vehicles.exists.pipe";
import { PrepareVehiclesBodyPipe } from "./prepare-body.pipe";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CreateVehicleDto } from "./create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { UploadFilesDecorators } from "src/modules/files/decorators/upload.decorators";
import { multerOptions } from "src/modules/files/config/multer/multer-options.config";
import { ParseFiles } from "src/modules/files/config/pipes/parse-files.pipe";

@ApiTags("Vehicles unit paths")
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
    ): Promise<Vehicles> {
        const vehicle: Vehicles = plainToInstance(Vehicles, { ...dto });
        return this.vehiclesService.create(vehicle);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe) 
        page: number,
    ): Promise<UpToTenUnitsPage<Vehicles>> {
        return this.vehiclesService.getUpToTen(page);
    }

    @Put()
    @UpdateUnitDecorators(CreateVehicleDto)
    async update(
        @Body(VehicleExistsPipe, PrepareVehiclesBodyPipe) 
        dto: CreateVehicleDto,
    ): Promise<Vehicles> {
        const vehicle: Vehicles = plainToInstance(Vehicles, { ...dto });
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
    @UploadFilesDecorators("files", undefined, multerOptions)
    async uploadImages(
        @UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, 
        @Query("unitName") unitName: string
    ) {
        return this.vehiclesService.uploadImages(files, unitName);
    }
}