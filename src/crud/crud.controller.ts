import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudService } from './crud.service';
import { ApiAddUnits } from './decorators/add.decorator';
import { ApiDeleteUnit } from './decorators/delete.decorator';
import { ApiGetUnits } from './decorators/get.decorator';
import { ApiUpdateUnit } from './decorators/update.decorator';
import { ExecutedDto } from './dto/executed.dto';
import { GetUnitsDto } from './dto/get-units.dto';
import { Unit, UnitTypes } from './types/types';

@ApiTags("Crud paths")
@Controller('crud')
export class CrudController {
    
    constructor(private crudService: CrudService) {}

    @Get("")
    @ApiGetUnits()
    async get(@Query("page") page: number, @Query("unitType") unitType: UnitTypes): Promise<GetUnitsDto> {
        return this.crudService.get(page, unitType);
    }

    @Post("")
    @ApiAddUnits()
    async add(@Body() body: Unit, @Query("unitType") unitType: UnitTypes): Promise<ExecutedDto> {
        return this.crudService.add(body, unitType);
    }

    @Put("")
    @ApiUpdateUnit()
    async update(@Body() body: Unit, @Query("id") id: string, @Query("unitType") unitType: UnitTypes): Promise<ExecutedDto> {
        return this.crudService.update(body, id, unitType);
    }

    @Delete("")
    @ApiDeleteUnit()
    async delete(@Query("id") id: string, @Query("unitType") unitType: UnitTypes): Promise<ExecutedDto> {
        return this.crudService.delete(id, unitType);
    }
}