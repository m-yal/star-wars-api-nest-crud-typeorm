import { Body, Controller, Delete, Get, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudService } from './crud.service';
import { ApiAddUnits } from './decorators/add.decorator';
import { ApiDeleteUnit } from './decorators/delete.decorator';
import { ApiGetUnits } from './decorators/get.decorator';
import { ApiUpdateUnit } from './decorators/update.decorator';
import { Unit, UnitTypes, UpToTenUnitsPage } from '../types/types';
import { ExecutedResponseInterseptor } from 'src/interceptors/executed-response.interceptor';
import { DataResponseInterceptor } from 'src/interceptors/up-to-ten-units-response.interceptor';

@ApiTags("Crud paths")
@Controller('crud')
export class CrudController {
    
    constructor(private readonly crudService: CrudService) {}

    @Get("")
    @ApiGetUnits()
    @UseInterceptors(DataResponseInterceptor)
    async get(@Query("page") page: number, @Query("unitType") unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        return this.crudService.get(page, unitType);
    }

    @Post("")
    @ApiAddUnits()
    @UseInterceptors(ExecutedResponseInterseptor)
    async add(@Body() body: Unit, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.crudService.add(body, unitType);
    }

    @Put("")
    @ApiUpdateUnit()
    @UseInterceptors(ExecutedResponseInterseptor)
    async update(@Body() body: Unit, @Query("id") id: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.crudService.update(body, id, unitType);
    }

    @Delete("")
    @ApiDeleteUnit()
    @UseInterceptors(ExecutedResponseInterseptor)
    async delete(@Query("id") id: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.crudService.delete(id, unitType);
    }
}