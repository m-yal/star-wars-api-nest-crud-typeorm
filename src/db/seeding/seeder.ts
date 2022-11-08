import * as mysql from "mysql2";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

enum EntityPointerLink {
    People = "people",
    //...       
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
        this.insertIntoDB(results, connection);
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

    private convertArraysToString(objectsWithArrayTypes: any[]): any[] {
        for (const obj of objectsWithArrayTypes) {
            obj.films = obj.films.toString();
            obj.species = obj.species.toString();
            obj.vehicles = obj.vehicles.toString();
            obj.starships = obj.starships.toString();
        }
        return objectsWithArrayTypes;
    }

    private insertIntoDB(results: any[], connection: mysql.Connection): void {
        for (const obj of results) {
            connection.query(`INSERT INTO ${EntityPointerLink.People}() VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, Object.values(obj));
        }
    }
}
new Seeder().run(EntityPointerLink.People);