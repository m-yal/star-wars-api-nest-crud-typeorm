import { MigrationInterface, QueryRunner, Table } from "typeorm";
import dataSource from "./data-source-for-seeding";
import { FilmsSeeder } from "./films.seed";
import PeopleSeeder from "./people.seed";
import { PlanetsSeeder } from "./planets.seed";
import { SpeciesSeeder } from "./species.seed";
import StarshipsSeeder from "./starships.seed";
import VehiclesSeeder from "./vehicles.seed";

export class Seeder implements MigrationInterface {
    name: string = 'Seeder1669806219723';

    private readonly SWAPI_DB_NAME = "swapi";
    private readonly SEEDERS_ARRAY = [
        new FilmsSeeder(dataSource), new PeopleSeeder(dataSource),
        new PlanetsSeeder(dataSource), new SpeciesSeeder(dataSource),
        new StarshipsSeeder(dataSource), new VehiclesSeeder(dataSource),
        // new UsersSeeder(dataSource),
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        const baseDataSeedRequests = this.SEEDERS_ARRAY.map(seeder => seeder.baseDataSeed());
        Promise.all(baseDataSeedRequests);
        const setRelationsSeedRequests = this.SEEDERS_ARRAY.map(seeder => seeder.setRelations());
        Promise.all(setRelationsSeedRequests);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tablesNames: Promise<string>[] = (await queryRunner.getTables())
            .map(async table => table.name);
        await this.deleteAllImageFiles(tablesNames);
    }





    private deleteAllImageFiles(tablesNames: Promise<string>[]): void {
        //1. delete all files in images dir (recursively delete dir)
        //2. delete from s3 bucket all files
    }
}