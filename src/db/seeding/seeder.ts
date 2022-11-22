import * as mysql from "mysql2";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

enum EntityPointerLink {
    People = "people",
    Films = "films",
    Planets = "planets",
    Species = "species",
    Starships = "starships",
    Vehicles = "vehicles"       
}

dotenv.config();
const {DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD} = process.env;

class Seeder {
    private readonly swapiLink: RequestInfo = "https://swapi.dev/api/";
    
    private readonly connectionConfig: mysql.ConnectionOptions = {
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
    }

    private readonly fetchInfo: any = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    }

    public async run(entityName: EntityPointerLink): Promise<void> {
        const connection = mysql.createConnection(this.connectionConfig);
        const results = await this.fetchFromSwapiDev(entityName);
        this.insertIntoDB(results, connection, entityName);
        connection.end();
    }

    private async fetchFromSwapiDev(entityName: EntityPointerLink): Promise<any[]> {
        let link: string = this.swapiLink + entityName;
        let apiRes: {next: string, results: any[]};
        let results: string[] = [];
        do {
            apiRes = await (await fetch(link, this.fetchInfo)).json();
            link = apiRes.next;
            results = results.concat(this.convertArraysToString(apiRes.results));
        } while (link);
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

    private insertIntoDB(results: any[], connection: mysql.Connection, entityName: EntityPointerLink): void {
        const objKeys: string = Object.keys(results[0]).toString(); //[0] because one instance is enough for defining schema
        const objKeysAmount: number = Object.keys(results[0]).length;
        const quesionMarks: string = "?, ".repeat(objKeysAmount).replace(/, $/, "");
        console.log(`obj keys ${objKeys} \n obj keys amount ${objKeysAmount} \n questions marks ${quesionMarks}`);
        for (const obj of results) {
            connection.query(`INSERT INTO ${entityName}(${objKeys}) VALUES (${quesionMarks})`, Object.values(obj));
        }
    }
}

async function seedDB() {
    const seeder = new Seeder();
    await seeder.run(EntityPointerLink.People);
    await seeder.run(EntityPointerLink.Films);
    await seeder.run(EntityPointerLink.Planets);
    await seeder.run(EntityPointerLink.Species);
    await seeder.run(EntityPointerLink.Starships);
    await seeder.run(EntityPointerLink.Vehicles);
}
seedDB();