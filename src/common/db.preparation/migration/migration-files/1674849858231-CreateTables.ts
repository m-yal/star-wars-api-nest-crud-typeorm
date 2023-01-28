import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1674849858231 implements MigrationInterface {
    name = 'CreateTables1674849858231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` enum ('user', 'admin') NOT NULL, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`files\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets\` (\`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`homeworldName\` varchar(255) NULL, UNIQUE INDEX \`IDX_86eba64ed08b3673df47cca655\` (\`url\`), UNIQUE INDEX \`REL_ecf776e6d97f27472faf5fbd4e\` (\`homeworldName\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9feba736ac458e843a5df80ff1\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworldName\` varchar(255) NULL, UNIQUE INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` longtext NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` date NOT NULL, UNIQUE INDEX \`IDX_6c40323ce20cc863369cc33ee8\` (\`url\`), PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species_species\` (\`peopleName\` varchar(255) NOT NULL, \`speciesName\` varchar(255) NOT NULL, INDEX \`IDX_7890f7a17da80334a6fdb07402\` (\`peopleName\`), INDEX \`IDX_49c5eac377041d5fc0301fb3cc\` (\`speciesName\`), PRIMARY KEY (\`peopleName\`, \`speciesName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles_vehicles\` (\`peopleName\` varchar(255) NOT NULL, \`vehiclesName\` varchar(255) NOT NULL, INDEX \`IDX_83cbdb22221367619f97214396\` (\`peopleName\`), INDEX \`IDX_6efc7f4ca98bae5e70038ef107\` (\`vehiclesName\`), PRIMARY KEY (\`peopleName\`, \`vehiclesName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships_starships\` (\`peopleName\` varchar(255) NOT NULL, \`starshipsName\` varchar(255) NOT NULL, INDEX \`IDX_7a0c7f4f7f6d3c95e61665acf7\` (\`peopleName\`), INDEX \`IDX_1bb2a3b679e6aed8465da807e5\` (\`starshipsName\`), PRIMARY KEY (\`peopleName\`, \`starshipsName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_characters_people\` (\`filmsName\` varchar(255) NOT NULL, \`peopleName\` varchar(255) NOT NULL, INDEX \`IDX_bf83b300a103c91769890a2313\` (\`filmsName\`), INDEX \`IDX_bafeccaf1d4cb61ca60d9ebb5b\` (\`peopleName\`), PRIMARY KEY (\`filmsName\`, \`peopleName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets_planets\` (\`filmsName\` varchar(255) NOT NULL, \`planetsName\` varchar(255) NOT NULL, INDEX \`IDX_7dc2389b87a4a36220acc47b5f\` (\`filmsName\`), INDEX \`IDX_8a92f60394d4ee6e7fc81d827e\` (\`planetsName\`), PRIMARY KEY (\`filmsName\`, \`planetsName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_starships\` (\`filmsName\` varchar(255) NOT NULL, \`starshipsName\` varchar(255) NOT NULL, INDEX \`IDX_3e9829e15a1df870101349f375\` (\`filmsName\`), INDEX \`IDX_9db92b36879610b60bba1a2ae7\` (\`starshipsName\`), PRIMARY KEY (\`filmsName\`, \`starshipsName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_vehicles\` (\`filmsName\` varchar(255) NOT NULL, \`vehiclesName\` varchar(255) NOT NULL, INDEX \`IDX_1b69b4263bdd7f946bcda6c3e2\` (\`filmsName\`), INDEX \`IDX_fd6da67a11d9236fca7d1ffa96\` (\`vehiclesName\`), PRIMARY KEY (\`filmsName\`, \`vehiclesName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_species\` (\`filmsName\` varchar(255) NOT NULL, \`speciesName\` varchar(255) NOT NULL, INDEX \`IDX_3f9de8ece00ef49b5cd907220c\` (\`filmsName\`), INDEX \`IDX_65e61678ec3b1591c721c8e1dc\` (\`speciesName\`), PRIMARY KEY (\`filmsName\`, \`speciesName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_ecf776e6d97f27472faf5fbd4e7\` FOREIGN KEY (\`homeworldName\`) REFERENCES \`planets\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_6be1bbaca9723377309a5325748\` FOREIGN KEY (\`homeworldName\`) REFERENCES \`planets\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` ADD CONSTRAINT \`FK_7890f7a17da80334a6fdb074026\` FOREIGN KEY (\`peopleName\`) REFERENCES \`people\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` ADD CONSTRAINT \`FK_49c5eac377041d5fc0301fb3cc1\` FOREIGN KEY (\`speciesName\`) REFERENCES \`species\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` ADD CONSTRAINT \`FK_83cbdb22221367619f972143969\` FOREIGN KEY (\`peopleName\`) REFERENCES \`people\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` ADD CONSTRAINT \`FK_6efc7f4ca98bae5e70038ef1072\` FOREIGN KEY (\`vehiclesName\`) REFERENCES \`vehicles\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` ADD CONSTRAINT \`FK_7a0c7f4f7f6d3c95e61665acf73\` FOREIGN KEY (\`peopleName\`) REFERENCES \`people\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` ADD CONSTRAINT \`FK_1bb2a3b679e6aed8465da807e56\` FOREIGN KEY (\`starshipsName\`) REFERENCES \`starships\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` ADD CONSTRAINT \`FK_bf83b300a103c91769890a2313b\` FOREIGN KEY (\`filmsName\`) REFERENCES \`films\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` ADD CONSTRAINT \`FK_bafeccaf1d4cb61ca60d9ebb5be\` FOREIGN KEY (\`peopleName\`) REFERENCES \`people\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` ADD CONSTRAINT \`FK_7dc2389b87a4a36220acc47b5f0\` FOREIGN KEY (\`filmsName\`) REFERENCES \`films\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` ADD CONSTRAINT \`FK_8a92f60394d4ee6e7fc81d827e1\` FOREIGN KEY (\`planetsName\`) REFERENCES \`planets\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_3e9829e15a1df870101349f375d\` FOREIGN KEY (\`filmsName\`) REFERENCES \`films\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_9db92b36879610b60bba1a2ae7a\` FOREIGN KEY (\`starshipsName\`) REFERENCES \`starships\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_1b69b4263bdd7f946bcda6c3e25\` FOREIGN KEY (\`filmsName\`) REFERENCES \`films\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_fd6da67a11d9236fca7d1ffa96f\` FOREIGN KEY (\`vehiclesName\`) REFERENCES \`vehicles\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_3f9de8ece00ef49b5cd907220c7\` FOREIGN KEY (\`filmsName\`) REFERENCES \`films\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_65e61678ec3b1591c721c8e1dc9\` FOREIGN KEY (\`speciesName\`) REFERENCES \`species\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_65e61678ec3b1591c721c8e1dc9\``);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_3f9de8ece00ef49b5cd907220c7\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_fd6da67a11d9236fca7d1ffa96f\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_1b69b4263bdd7f946bcda6c3e25\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_9db92b36879610b60bba1a2ae7a\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_3e9829e15a1df870101349f375d\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` DROP FOREIGN KEY \`FK_8a92f60394d4ee6e7fc81d827e1\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` DROP FOREIGN KEY \`FK_7dc2389b87a4a36220acc47b5f0\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` DROP FOREIGN KEY \`FK_bafeccaf1d4cb61ca60d9ebb5be\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` DROP FOREIGN KEY \`FK_bf83b300a103c91769890a2313b\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` DROP FOREIGN KEY \`FK_1bb2a3b679e6aed8465da807e56\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` DROP FOREIGN KEY \`FK_7a0c7f4f7f6d3c95e61665acf73\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` DROP FOREIGN KEY \`FK_6efc7f4ca98bae5e70038ef1072\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` DROP FOREIGN KEY \`FK_83cbdb22221367619f972143969\``);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` DROP FOREIGN KEY \`FK_49c5eac377041d5fc0301fb3cc1\``);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` DROP FOREIGN KEY \`FK_7890f7a17da80334a6fdb074026\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_6be1bbaca9723377309a5325748\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_ecf776e6d97f27472faf5fbd4e7\``);
        await queryRunner.query(`DROP INDEX \`IDX_65e61678ec3b1591c721c8e1dc\` ON \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_3f9de8ece00ef49b5cd907220c\` ON \`films_species_species\``);
        await queryRunner.query(`DROP TABLE \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd6da67a11d9236fca7d1ffa96\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b69b4263bdd7f946bcda6c3e2\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_9db92b36879610b60bba1a2ae7\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e9829e15a1df870101349f375\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a92f60394d4ee6e7fc81d827e\` ON \`films_planets_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_7dc2389b87a4a36220acc47b5f\` ON \`films_planets_planets\``);
        await queryRunner.query(`DROP TABLE \`films_planets_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_bafeccaf1d4cb61ca60d9ebb5b\` ON \`films_characters_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf83b300a103c91769890a2313\` ON \`films_characters_people\``);
        await queryRunner.query(`DROP TABLE \`films_characters_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_1bb2a3b679e6aed8465da807e5\` ON \`people_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a0c7f4f7f6d3c95e61665acf7\` ON \`people_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`people_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_6efc7f4ca98bae5e70038ef107\` ON \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_83cbdb22221367619f97214396\` ON \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_49c5eac377041d5fc0301fb3cc\` ON \`people_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_7890f7a17da80334a6fdb07402\` ON \`people_species_species\``);
        await queryRunner.query(`DROP TABLE \`people_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c40323ce20cc863369cc33ee8\` ON \`films\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` ON \`people\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_9feba736ac458e843a5df80ff1\` ON \`starships\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP INDEX \`REL_ecf776e6d97f27472faf5fbd4e\` ON \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_86eba64ed08b3673df47cca655\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` ON \`planets\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
        await queryRunner.query(`DROP TABLE \`files\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
