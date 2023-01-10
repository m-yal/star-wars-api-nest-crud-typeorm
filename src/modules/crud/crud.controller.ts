import { Body, Controller, DefaultValuePipe, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudService } from './crud.service';
import { ApiAddUnits as AddUnitDecorators } from './config/decorators/add.decorator';
import { ApiDeleteUnit as DeleteUnitDecorators } from './config/decorators/delete.decorator';
import { GetUpToTenUnitsDecorators } from './config/decorators/get.decorator';
import { ApiUpdateUnit as UpdateUnitDecorators } from './config/decorators/update.decorator';
import { Unit, UnitTypes, UpToTenUnitsPage } from 'src/common/types/types';
import { ICrudActions } from './config/interfaces/crud.actions.interface';

@ApiTags("Crud paths")
@Controller('crud')
export class CrudController implements ICrudActions {
    
    constructor(private readonly crudService: CrudService) {}

    @Get("")
    @GetUpToTenUnitsDecorators()
    async get(@Query("page", new DefaultValuePipe(1)) page: number, @Query("unitType") unitType: UnitTypes): Promise<UpToTenUnitsPage> {
        return this.crudService.get(page, unitType);
    }

    @Post("")
    @AddUnitDecorators()
    async add(@Body() body: Unit, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.crudService.add(body, unitType);
    }

    @Patch("")
    @UpdateUnitDecorators()
    async update(@Body() body: Unit, @Query("id") id: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.crudService.update(body, id, unitType);
    }

    @Delete("")
    @DeleteUnitDecorators()
    async delete(@Query("id") id: string, @Query("unitType") unitType: UnitTypes): Promise<true> {
        return this.crudService.delete(id, unitType);
    }
}