import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { StarshipsService } from "./startships.service";
import { Starships } from "./starships.entity";
import { CreateUnitDecorators } from "../config/decorators/createUnit.decorator";
import { GetUpToTenUnitsDecorators } from "../config/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../config/decorators/update.decorator";
import { DeleteUnitDecorators } from "../config/decorators/delete.decorator";
import { ValidateIdPipe } from "../config/pipes/validate-id.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";
import { StarshipExistsPipe } from "./starships.exists.pipe";
import { PrepareStarshipsBodyPipe } from "./starships.prepare-body.pipe";

@Controller('starships')
export class StarshipsController {

    constructor(
        private readonly starshipsService: StarshipsService,
    ) { }
    
    @Post()
    @CreateUnitDecorators(new Starships())
    async create(
        @Body(PrepareStarshipsBodyPipe) 
        starship: Starships
    ): Promise<Starships> {
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

    @Put(':name')
    @UpdateUnitDecorators(new Starships())
    async update(
        @Param('name', ValidateIdPipe, StarshipExistsPipe) 
        name: string,
        @Body(PrepareStarshipsBodyPipe)
        starships: Starships,
    ): Promise<true> {
        return this.starshipsService.update(name, starships);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateIdPipe, StarshipExistsPipe) 
        name: string,
    ): Promise<true> {
        return this.starshipsService.delete(name);
    }
}