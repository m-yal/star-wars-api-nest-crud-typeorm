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

    private entitySeedersArray;
    private readonly IMAGES_RELATIVE_FILE_PATH = process.env.IMAGES_RELATIVE_FILE_PATH;

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.setupEntitySeeders(queryRunner);

        const baseDataSeedRequests = this.entitySeedersArray.map(async seeder => await seeder.baseDataSeed());
        await Promise.all(baseDataSeedRequests);

        const setRelationsSeedRequests = this.entitySeedersArray.map(async seeder => await seeder.setRelations());
        await Promise.all(setRelationsSeedRequests);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await this.deleteAllImageFiles(queryRunner);
        await queryRunner.query("SET FOREIGN_KEY_CHECKS = 0;")
        await queryRunner.clearTable("people");
        await queryRunner.clearTable("films");
        await queryRunner.clearTable("films_characters_people");
        await queryRunner.clearTable("films_planets_planets");
        await queryRunner.clearTable("films_species_species");
        await queryRunner.clearTable("films_starships_starships");
        await queryRunner.clearTable("films_vehicles_vehicles");
        await queryRunner.clearTable("people_species_species");
        await queryRunner.clearTable("people_starships_starships");
        await queryRunner.clearTable("people_vehicles_vehicles");
        await queryRunner.clearTable("planets");
        await queryRunner.clearTable("species");
        await queryRunner.clearTable("starships");
        await queryRunner.clearTable("users");
        await queryRunner.clearTable("vehicles");
        await queryRunner.query("SET FOREIGN_KEY_CHECKS = 1;");
    }

    private setupEntitySeeders(queryRuner: QueryRunner) {
        this.entitySeedersArray = [
            new FilmsSeeder(queryRuner), new PeopleSeeder(queryRuner),
            new PlanetsSeeder(queryRuner), new SpeciesSeeder(queryRuner),
            new StarshipsSeeder(queryRuner), new VehiclesSeeder(queryRuner),
            // new UsersSeeder(),
        ];
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