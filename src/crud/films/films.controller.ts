// import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
// import { CrudService } from '../crud.service';

// @Controller('films')
// export class FilmsController {

//     constructor(private crudService: CrudService) {}

//     private readonly UNIT_TYPE: any = "films";

//     @Get("")
//     // @ApiOperation({summary: "Get up to 10 persons ordered by lastly adding"})
//     // @ApiResponse({
//     //     status: HttpStatus.OK,
//     //     description: "Up to ten persons sent to client",
//     //     type: LastCreatedPeopleDto
//     // })
//     get(@Query("page") page: number) {
//         return this.crudService.get(page, this.UNIT_TYPE);
//     }

//     @Post("")
//     // @ApiOperation({summary: "Add person to db"})
//     // @ApiBody({ type: PersonDto })
//     // @ApiResponse({
//     //     status: HttpStatus.CREATED,
//     // })
//     add(@Body() body: any) {
//         this.crudService.add(body, this.UNIT_TYPE);
//         return {addingExecuted: true};
//     }

//     @Put("")
//     // @ApiResponse({
//     //     status: HttpStatus.OK,
//     // })
//     // @ApiOperation({summary: "Update single person under id in params"})
//     update(@Body() body: any, @Query("id") id: string) {
//         this.crudService.update(body, +id, this.UNIT_TYPE);
//         return {updateExecuted: true};
//     }

//     @Delete("")
//     // @ApiResponse({
//     //     status: HttpStatus.OK,
//     // })
//     // @ApiOperation({summary: "Remove single person under id in params"})
//     delete(@Query("id") id: string) {
//         this.crudService.delete(+id, this.UNIT_TYPE);
//         return {deletionExecuted: true};
//     }
// }