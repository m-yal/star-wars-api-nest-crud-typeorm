import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, ValidationPipe } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { People } from "./people.entity";
import { PeopleService } from "./people.service";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { PreparePeopleBodyPipe } from "./prepare-body.pipe";
import { PeopleExistsPipe } from "./people.exists.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePeopleDto } from "./create.dto";
import { plainToInstance } from "class-transformer";
import { FilmsService } from "../films/films.service";
import { SpeciesService } from "../species/species.service";
import { StarshipsService } from "../starships/startships.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { FilesService } from "src/modules/files/files.service";
import { Films } from "../films/films.entity";
import { Species } from "../species/species.entity";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { UploadFilesDecorators } from "src/modules/files/decorators/upload.decorators";
import { multerOptions } from "src/modules/files/config/multer/multer-options.config";
import { ParseFiles } from "src/modules/files/config/pipes/parse-files.pipe";

@Controller('people')
@ApiTags("People unit tags")
export class PeopleController {

    constructor(
        private readonly peopleService: PeopleService,
    ) { }

    @Post()
    @CreateUnitDecorators(CreatePeopleDto)
    async create(
        @Body(PreparePeopleBodyPipe) 
        dto: CreatePeopleDto,
    ): Promise<People> {
        const people: People = plainToInstance(People, { ...dto });
        return this.peopleService.create(people);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1), ) 
        page: number,
    ): Promise<UpToTenUnitsPage<People>> {
        return this.peopleService.getUpToTen(page);
    }

    @Put()
    @UpdateUnitDecorators(CreatePeopleDto)
    async update(
        @Body(PeopleExistsPipe, PreparePeopleBodyPipe) 
        dto: CreatePeopleDto,
    ): Promise<People> {
        const people: People = plainToInstance(People, { ...dto });
        return this.peopleService.update(people);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateNamePipe)
        name: string,
    ): Promise<{ name: string }> {
        return this.peopleService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerOptions)
    async uploadImages(@UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, @Query("unitName") unitName: string) {
        return this.peopleService.uploadImages(files, unitName);
    }
}