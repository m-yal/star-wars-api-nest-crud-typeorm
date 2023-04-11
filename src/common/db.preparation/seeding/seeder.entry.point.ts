import { config } from "dotenv";
import { MigrationInterface, QueryRunner } from "typeorm";

import { FilmsSeeder } from "./entities-helpers/films.seed";
import PeopleSeeder from "./entities-helpers/people.seed";
import { PlanetsSeeder } from "./entities-helpers/planets.seed";
import { SpeciesSeeder } from "./entities-helpers/species.seed";
import StarshipsSeeder from "./entities-helpers/starships.seed";
import VehiclesSeeder from "./entities-helpers/vehicles.seed";
import { mkdir, rm } from "fs";
import UsersSeeder from "./entities-helpers/users.seed";
import { BaseUnitsSeeder } from "./entities-helpers/base-entity-seeder";
import { AwsS3FilesRepository } from "../../../modules/files/repositories/files.aws-s3.repository";

config();

export class Seeder implements MigrationInterface {

    name: string = 'Seeder1669806219723'; //do not change the value

    private entitySeedersArray: (BaseUnitsSeeder | UsersSeeder)[];
    private readonly IMAGES_RELATIVE_FILE_PATH: string = process.env.IMAGES_RELATIVE_FILE_PATH;

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.initEntitySeeders(queryRunner);

        const baseDataSeedRequests: Promise<void>[] = this.entitySeedersArray.map(async seeder => seeder.baseDataSeed());
        await Promise.all(baseDataSeedRequests);

        const setRelationsSeedRequests: Promise<void>[] = this.entitySeedersArray.map(async seeder => await seeder.setRelations());
        await Promise.all(setRelationsSeedRequests);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            this.deleteAllImageFiles(queryRunner),
            this.clearAllTables(queryRunner),
        ]);
    }




    private async clearAllTables(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("SET FOREIGN_KEY_CHECKS = 0;");
        await Promise.all([
            queryRunner.clearTable("people"),
            queryRunner.clearTable("films"),
            queryRunner.clearTable("films_people_relations"),
            queryRunner.clearTable("films_planets_relations"),
            queryRunner.clearTable("films_starships_relations"),
            queryRunner.clearTable("films_vehicles_relations"),
            queryRunner.clearTable("films_species_relations"),
            queryRunner.clearTable("people_species_relations"),
            queryRunner.clearTable("people_vehicles_relations"),
            queryRunner.clearTable("people_starships_relations"),
            queryRunner.clearTable("planets"),
            queryRunner.clearTable("species"),
            queryRunner.clearTable("starships"),
            queryRunner.clearTable("users"),
            queryRunner.clearTable("vehicles"),
            queryRunner.clearTable("files"),
            queryRunner.clearTable("films_images_relations"),
            queryRunner.clearTable("people_images_relations"),
            queryRunner.clearTable("planets_images_relations"),
            queryRunner.clearTable("species_images_relaitions"),
            queryRunner.clearTable("starships_images_relations"),
            queryRunner.clearTable("vehicles_images_relations"),
        ]);
        await queryRunner.query("SET FOREIGN_KEY_CHECKS = 1;");
    }

    private initEntitySeeders(queryRuner: QueryRunner): void {
        this.entitySeedersArray = [
            new FilmsSeeder(queryRuner), new PeopleSeeder(queryRuner),
            new PlanetsSeeder(queryRuner), new SpeciesSeeder(queryRuner),
            new StarshipsSeeder(queryRuner), new VehiclesSeeder(queryRuner),
            new UsersSeeder(queryRuner),
        ];
    }

    private async deleteAllImageFiles(queryRunner: QueryRunner): Promise<void> {
        rm(this.IMAGES_RELATIVE_FILE_PATH, { recursive: true, force: true }, this.throwErrorOrRecreateDir());
        await AwsS3FilesRepository.emptyBucket();
    }

    private throwErrorOrRecreateDir(): (err: Error) => void {
        return (err: Error) => {
            if (err) throw err;
            mkdir(this.IMAGES_RELATIVE_FILE_PATH, {}, (err) => {
                if (err) throw err;
                console.log("Directory for images recreated. Relative path to it: " + this.IMAGES_RELATIVE_FILE_PATH);
            });
        }
    }
}