import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { StarshipsService } from "./startships.service";
import { Starships } from "./starships.entity";
import { GetUpToTenUnitsDecorators } from "../../../common/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../../../common/decorators/update.decorator";
import { DeleteUnitDecorators } from "../../../common/decorators/delete.decorator";
import { ValidateNamePipe } from "../config/pipes/validate-name.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { StarshipExistsPipe } from "./starships.exists.pipe";
import { PrepareStarshipsBodyPipe } from "./prepare-body.pipe";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CreateStarshipDto } from "./create.dto";
import { CreateUnitDecorators } from "../../../common/decorators/create.decorator";
import { UploadFilesDecorators } from "src/modules/files/decorators/upload.decorators";
import { multerOptions } from "src/modules/files/config/multer/multer-options.config";
import { ParseFiles } from "src/modules/files/config/pipes/parse-files.pipe";

@ApiTags("Starships unit paths")
@Controller('starships')
export class StarshipsController {

    constructor(
        private readonly starshipsService: StarshipsService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(CreateStarshipDto)
    async create(
        @Body(PrepareStarshipsBodyPipe) 
        dto: CreateStarshipDto
    ): Promise<Starships> {
        const starship: Starships = plainToInstance(Starships, { ...dto });
        return this.starshipsService.create(starship);
    }

    @Get()
    @GetUpToTenUnitsDecorators()
    getPage(
        @Query('page', ParseIntPipe, ValidatePagePipe, new DefaultValuePipe(1), ParseIntPipe) 
        page: number
    ): Promise<UpToTenUnitsPage<Starships>> {
        return this.starshipsService.getUpToTen(page);
    }

    @Put()
    @UpdateUnitDecorators(CreateStarshipDto)
    async update(
        @Body(StarshipExistsPipe, PrepareStarshipsBodyPipe)
        dto: CreateStarshipDto,
    ): Promise<Starships> {
        const starship: Starships = plainToInstance(Starships, { ...dto });
        return this.starshipsService.update(starship);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateNamePipe) 
        name: string,
    ): Promise<{ name: string }> {
        return this.starshipsService.delete(name);
    }

    @Post('file')
    @ApiOperation({ summary: "Uplod file for unit" })
    @UploadFilesDecorators("files", undefined, multerOptions)
    async uploadImages(
        @UploadedFiles(ParseFiles) files: Array<Express.Multer.File>, 
        @Query("unitName") unitName: string
    ) {
        return this.starshipsService.uploadImages(files, unitName);
    }
}