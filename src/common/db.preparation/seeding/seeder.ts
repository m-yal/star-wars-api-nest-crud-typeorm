import { config } from "dotenv";
import { MigrationInterface, QueryRunner } from "typeorm";
import { FilmsSeeder } from "./films.seed";
import PeopleSeeder from "./people.seed";
import { PlanetsSeeder } from "./planets.seed";
import { SpeciesSeeder } from "./species.seed";
import StarshipsSeeder from "./starships.seed";
import VehiclesSeeder from "./vehicles.seed";
import * as fs from "fs";

config();

export class Seeder implements MigrationInterface {
    name: string = 'Seeder1669806219723';

    private readonly SEEDERS_ARRAY = [
        new FilmsSeeder(), new PeopleSeeder(),
        // new PlanetsSeeder(), new SpeciesSeeder(),
        // new StarshipsSeeder(), new VehiclesSeeder(),
        // new UsersSeeder(),
    ];
    private readonly IMAGES_RELATIVE_FILE_PATH = process.env.IMAGES_RELATIVE_FILE_PATH;

    public async up(queryRunner: QueryRunner): Promise<void> {
        const baseDataSeedRequests = this.SEEDERS_ARRAY.map(async seeder => await seeder.baseDataSeed(queryRunner));
        await Promise.all(baseDataSeedRequests);

        const setRelationsSeedRequests = this.SEEDERS_ARRAY.map(async seeder => await seeder.setRelations(queryRunner));
        await Promise.all(setRelationsSeedRequests);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await this.deleteAllImageFiles(queryRunner);
    }



    private async deleteAllImageFiles(queryRunner: QueryRunner): Promise<void> {
        //1. delete all files in images dir (recursively delete dir)
        fs.rm(this.IMAGES_RELATIVE_FILE_PATH, { recursive: true, force: true }, err => {
            if (err) throw err;
        })
        //2. delete from s3 bucket all files
        // await new AwsS3FilesRepository().emptyBucket();
    }
}