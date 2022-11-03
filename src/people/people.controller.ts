import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {}

    @Get()
    getAll(): string[] {
        return this.peopleService.getAll();
    }

    @Get(":id")
    getByID(@Param('id') id: string): string {
        return "person id: " + id;
    }

    @Post("add")
    addPerson(): string {
        return "person added"
    }

    @Put("update")
    updatePerson(): string {
        return "person updated"
    }

    @Delete("delete")
    deletePerson(): string {
        return "perdon deleted"
    }
}
