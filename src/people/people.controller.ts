import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonDto } from './dto/person.dto';
import { UpToTenPersonsDto } from './dto/up-to-ten-persons.dto';
import { PeopleService } from './people.service';

@ApiTags("People paths")
@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {}

    @Get("lastTen")
    @ApiOperation({summary: "Get up to last ten persons added to storage"})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Up to ten persons sent to client",
        type: UpToTenPersonsDto
    })
    getAll(@Query("page") page: number): any {
        return this.peopleService.getAll(page);
    }

    @Post("add")
    @ApiOperation({summary: "Add person to db"})
    @ApiBody({ type: PersonDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
    })
    addPerson(@Body() body: PersonDto) {
        return this.peopleService.add(body);
    }

    @Put("update/:id")
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiOperation({summary: "Update single person under id in params"})
    updatePerson(@Body() body: PersonDto, @Param("id") id: string) {
        this.peopleService.update(body, +id);
        return;
    }

    @Delete("delete/:id")
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiOperation({summary: "Remove single person under id in params"})
    deletePerson(@Param("id") id: string) {
        this.peopleService.delete(+id);
        return;
    }
}
