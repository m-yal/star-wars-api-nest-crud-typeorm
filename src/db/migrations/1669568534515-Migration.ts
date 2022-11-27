import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1669568534515 implements MigrationInterface {
    name = 'Migration1669568534515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planets\` (\`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`homeworldUrl\` varchar(255) NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`homeworldUrl\` varchar(255) NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_characters_people\` (\`filmsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_87371a13b36ecd6112569dba16\` (\`filmsUrl\`), INDEX \`IDX_054a3a4eb4ddda626abe77fc52\` (\`peopleUrl\`), PRIMARY KEY (\`filmsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets_planets\` (\`filmsUrl\` varchar(255) NOT NULL, \`planetsUrl\` varchar(255) NOT NULL, INDEX \`IDX_024db50ce93ff1f9f7fc9989c0\` (\`filmsUrl\`), INDEX \`IDX_5f59dca46033e52e574f6ddb49\` (\`planetsUrl\`), PRIMARY KEY (\`filmsUrl\`, \`planetsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_starships\` (\`filmsUrl\` varchar(255) NOT NULL, \`starshipsUrl\` varchar(255) NOT NULL, INDEX \`IDX_42a6f78a5e0a7cab4cb9e48c83\` (\`filmsUrl\`), INDEX \`IDX_a0fc0eb88d9e1803cfa56b208e\` (\`starshipsUrl\`), PRIMARY KEY (\`filmsUrl\`, \`starshipsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_vehicles\` (\`filmsUrl\` varchar(255) NOT NULL, \`vehiclesUrl\` varchar(255) NOT NULL, INDEX \`IDX_484c9e7e2a2d70c5cb21bac4a3\` (\`filmsUrl\`), INDEX \`IDX_13e43a469cda241fcb98f0f48e\` (\`vehiclesUrl\`), PRIMARY KEY (\`filmsUrl\`, \`vehiclesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_species\` (\`filmsUrl\` varchar(255) NOT NULL, \`speciesUrl\` varchar(255) NOT NULL, INDEX \`IDX_007550d8de7938d60c70b1d120\` (\`filmsUrl\`), INDEX \`IDX_3cc19524ccd8d72bc144d81f99\` (\`speciesUrl\`), PRIMARY KEY (\`filmsUrl\`, \`speciesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_5908876286fdb811284ba2d968b\` FOREIGN KEY (\`homeworldUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_db5ab220b9854727011c353fa6c\` FOREIGN KEY (\`homeworldUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` ADD CONSTRAINT \`FK_87371a13b36ecd6112569dba16c\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` ADD CONSTRAINT \`FK_054a3a4eb4ddda626abe77fc52e\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` ADD CONSTRAINT \`FK_024db50ce93ff1f9f7fc9989c02\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` ADD CONSTRAINT \`FK_5f59dca46033e52e574f6ddb49a\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_42a6f78a5e0a7cab4cb9e48c83c\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_a0fc0eb88d9e1803cfa56b208e0\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_484c9e7e2a2d70c5cb21bac4a33\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_13e43a469cda241fcb98f0f48e6\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_007550d8de7938d60c70b1d1206\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_3cc19524ccd8d72bc144d81f99b\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_3cc19524ccd8d72bc144d81f99b\``);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_007550d8de7938d60c70b1d1206\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_13e43a469cda241fcb98f0f48e6\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_484c9e7e2a2d70c5cb21bac4a33\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_a0fc0eb88d9e1803cfa56b208e0\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_42a6f78a5e0a7cab4cb9e48c83c\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` DROP FOREIGN KEY \`FK_5f59dca46033e52e574f6ddb49a\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` DROP FOREIGN KEY \`FK_024db50ce93ff1f9f7fc9989c02\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` DROP FOREIGN KEY \`FK_054a3a4eb4ddda626abe77fc52e\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` DROP FOREIGN KEY \`FK_87371a13b36ecd6112569dba16c\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_db5ab220b9854727011c353fa6c\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_5908876286fdb811284ba2d968b\``);
        await queryRunner.query(`DROP INDEX \`IDX_3cc19524ccd8d72bc144d81f99\` ON \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_007550d8de7938d60c70b1d120\` ON \`films_species_species\``);
        await queryRunner.query(`DROP TABLE \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_13e43a469cda241fcb98f0f48e\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_484c9e7e2a2d70c5cb21bac4a3\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0fc0eb88d9e1803cfa56b208e\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_42a6f78a5e0a7cab4cb9e48c83\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f59dca46033e52e574f6ddb49\` ON \`films_planets_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_024db50ce93ff1f9f7fc9989c0\` ON \`films_planets_planets\``);
        await queryRunner.query(`DROP TABLE \`films_planets_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_054a3a4eb4ddda626abe77fc52\` ON \`films_characters_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_87371a13b36ecd6112569dba16\` ON \`films_characters_people\``);
        await queryRunner.query(`DROP TABLE \`films_characters_people\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
    }

}
