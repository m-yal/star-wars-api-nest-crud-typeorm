import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UpToTenUnitsPage } from "src/common/types/types";
import { People } from "./people.entity";
import { PeopleService } from "./people.service";
import { DeleteUnitDecorators } from "../config/decorators/delete.decorator";
import { GetUpToTenUnitsDecorators } from "../config/decorators/get-up-to-ten.decorator";
import { UpdateUnitDecorators } from "../config/decorators/update.decorator";
import { ValidateIdPipe } from "../config/pipes/validate-id.pipe";
import { CreateUnitDecorators } from "../config/decorators/createUnit.decorator";
import { PreparePeopleBodyPipe } from "./people.prepare-body.pipe";
import { PeopleExistsPipe } from "./people.exists.pipe";
import { ValidatePagePipe } from "../config/pipes/validate-page.pipe";

@Controller('people')
export class PeopleController {

    constructor(
        private readonly peopleService: PeopleService,
    ) { }

    @Post()
    @CreateUnitDecorators(new People())
    async create(
        @Body(PreparePeopleBodyPipe) 
        people: People,
    ): Promise<People> {
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

    @Put(':name')
    @UpdateUnitDecorators(new People())
    async update(
        @Param('name', ValidateIdPipe, PeopleExistsPipe) 
        name: string,
        @Body(PreparePeopleBodyPipe) 
        people: People,
    ): Promise<true> {
        return this.peopleService.update(name, people);
    }

    @Delete(':name')
    @DeleteUnitDecorators()
    async remove(
        @Param('name', ValidateIdPipe, PeopleExistsPipe)
        name: string,
    ): Promise<true> {
        return this.peopleService.delete(name);
    }
}