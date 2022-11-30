import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Unit } from "src/crud/types/types";
import { MigrationInterface, QueryRunner } from "typeorm";

enum EntityNames {
    People = "people",
    Films = "films",
    Planets = "planets",
    Species = "species",
    Starships = "starships",
    Vehicles = "vehicles"       
}

/*

Execute only by command: npm run seed:run !
This caused by reverting migration (down method) after executing it up (up mehtod).
Deleting from data from db, for now is manual.

*/
export class Seeder implements MigrationInterface {
    name = 'Seeder1669806219723';

    private readonly httpService: HttpService = new HttpService();
    private queryRunner;
    private readonly swapiURL: string = "https://swapi.dev/api/";

    private readonly entitiesNamesToSeed: EntityNames[] = [
        EntityNames.People, EntityNames.Films,
        EntityNames.Planets, EntityNames.Species,
        EntityNames.Starships, EntityNames.Vehicles
    ];
    private readonly URL_SPLITTERATOR = ",";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // const {data} = await firstValueFrom(this.httpService.get<People>(this.swapiURL));
        // console.log("data " + JSON.stringify(data));
        // const peopleRepository = queryRunner.manager.getRepository(People);
        // const dbResponse = await peopleRepository.findAndCount();
        // console.log("dbResponse: " + JSON.stringify(dbResponse));
        this.queryRunner = queryRunner;
        await this.downloadRawDataFromApi();
        // await this.setupRelationsInDB();
    }

    private async downloadRawDataFromApi() {
        for await (const name of this.entitiesNamesToSeed) {
            const data = await this.fetchEntity(name);
            await this.insertIntoDB(data, name);
        }
    }

    private async fetchEntity(name: EntityNames): Promise<any> {
        let link: string = this.swapiURL + name;
        let results: Unit[] = []; 
        do {
            const {data} = await firstValueFrom(this.httpService.get(link));
            link = await data.next;
            console.log("data.next " + data.next);
            results = results.concat(this.convertArraysToString(await data.results));
        } while (link);
        console.log("results " + JSON.stringify(results));
        return results;
    }

    private convertArraysToString(objects: any[]): any[] {
        for (const obj of objects) {
            for (let field in obj) {
                if (Array.isArray(obj[field])) obj[field] = obj[field].toString();
            }
        }
        return objects;
    }

    private async insertIntoDB(results: any[], entityName: EntityNames): Promise<void> {
        const objKeys: string = Object.keys(results[0]).toString(); //[0] because one instance is enough for defining input data schema
        const objKeysAmount: number = Object.keys(results[0]).length;
        const quesionMarks: string = "?, ".repeat(objKeysAmount).replace(/, $/, "");
        console.log(`obj keys ${objKeys} \n obj keys amount ${objKeysAmount} \n questions marks ${quesionMarks}`);
        for await (const obj of results) {
            await this.queryRunner.query(`INSERT INTO ${entityName}(${objKeys}) VALUES (${quesionMarks})`, Object.values(obj));
        }
    }

    private async setupRelationsInDB() {
        throw new Error("Method not implemented.");
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Ready for execution seeding one more time. For this, launch: npm run seed:run");
    }
}