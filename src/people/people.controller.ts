import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPersonDto } from './dto/add.dto';
import { DeletedDto } from './dto/deleted.dto';
import { PersonDto } from './dto/person.dto';
import { LastCreatedPeopleDto } from './dto/up-to-ten-persons.dto';
import { UpdateDto } from './dto/update.dto';
import { PeopleService } from './people.service';

@ApiTags("People paths")
@Controller('people')
export class PeopleController {

    constructor(private peopleService: PeopleService) {}

    @Get("lastCreated")
    @ApiOperation({summary: "Get up to 10 persons lastly added to storage"})
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Up to ten persons sent to client",
        type: LastCreatedPeopleDto
    })
    getAll(@Query("page") page: number): Promise<LastCreatedPeopleDto> {
        return this.peopleService.getlastCreated(page);
    }

    @Post("add")
    @ApiOperation({summary: "Add person to db"})
    @ApiBody({ type: PersonDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
    })
    addPerson(@Body() body: PersonDto): AddPersonDto {
        this.peopleService.add(body);
        return {addingExecuted: true};
    }

    @Put("update/:id")
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiOperation({summary: "Update single person under id in params"})
    updatePerson(@Body() body: PersonDto, @Param("id") id: string): UpdateDto {
        this.peopleService.update(body, +id);
        return {updateExecuted: true};
    }

    @Delete("delete/:id")
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiOperation({summary: "Remove single person under id in params"})
    deletePerson(@Param("id") id: string): DeletedDto {
        this.peopleService.delete(+id);
        return {deletionExecuted: true};
    }
}