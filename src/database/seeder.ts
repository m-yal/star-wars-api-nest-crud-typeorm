import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { People } from "src/crud/entities/people.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

/* Execute only by command: npm run seed:run !
This caused by reverting migration (down method) after executing it up (up mehtod).
Deleting from data from db, for now is manual. */
export class Seeder implements MigrationInterface {
    name = 'Seeder1669806219723';

    private readonly httpService: HttpService = new HttpService();
    private readonly httpAdressTest = "https://swapi.dev/api/people/1/";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const {data} = await firstValueFrom(this.httpService.get<People>(this.httpAdressTest));
        console.log("data " + JSON.stringify(data));
        const peopleRepository = queryRunner.manager.getRepository(People);
        const dbResponse = await peopleRepository.findAndCount();
        console.log("dbResponse: " + JSON.stringify(dbResponse));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Ready for execution seeding one more time. For this, launch: npm run seed:run");
    }
}