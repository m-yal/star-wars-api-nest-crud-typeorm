import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1669925427888 implements MigrationInterface {
    name = 'CreateTables1669925427888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planets\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`residents\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`people\` text NOT NULL, \`films\` text NOT NULL, \`homeworld\` varchar(255) NULL, UNIQUE INDEX \`REL_609aca3a2f74ce1bc351251be7\` (\`homeworld\`), PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`pilots\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`pilots\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworld\` text NOT NULL, \`films\` text NOT NULL, \`species\` text NOT NULL, \`vehicles\` text NOT NULL, \`starships\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`characters\` text NOT NULL, \`planets\` text NOT NULL, \`starships\` text NOT NULL, \`vehicles\` text NOT NULL, \`species\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets_people_rel\` (\`planetsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_07e255db76adf826af8b3e60e1\` (\`planetsUrl\`), INDEX \`IDX_1f16ee7540ab592d7b3a55b91f\` (\`peopleUrl\`), PRIMARY KEY (\`planetsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species_rel\` (\`peopleUrl\` varchar(255) NOT NULL, \`speciesUrl\` varchar(255) NOT NULL, INDEX \`IDX_bd40bbbf318f65cf81b1213b32\` (\`peopleUrl\`), INDEX \`IDX_099771bcf6574c476fdcab844a\` (\`speciesUrl\`), PRIMARY KEY (\`peopleUrl\`, \`speciesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles_rel\` (\`peopleUrl\` varchar(255) NOT NULL, \`vehiclesUrl\` varchar(255) NOT NULL, INDEX \`IDX_b7798949a877a28df4dead718b\` (\`peopleUrl\`), INDEX \`IDX_1bd0f228680817fd63d5adb6f8\` (\`vehiclesUrl\`), PRIMARY KEY (\`peopleUrl\`, \`vehiclesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships_rel\` (\`peopleUrl\` varchar(255) NOT NULL, \`starshipsUrl\` varchar(255) NOT NULL, INDEX \`IDX_6bf7a7200c71f0d41c0f8887ee\` (\`peopleUrl\`), INDEX \`IDX_24319c3dfc91c3de84962b1d89\` (\`starshipsUrl\`), PRIMARY KEY (\`peopleUrl\`, \`starshipsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_people_rel\` (\`filmsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_b0b462b723da40bece470a998b\` (\`filmsUrl\`), INDEX \`IDX_abbfa6b6c8e6a435cd0d7c86a6\` (\`peopleUrl\`), PRIMARY KEY (\`filmsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_palnets_rel\` (\`filmsUrl\` varchar(255) NOT NULL, \`planetsUrl\` varchar(255) NOT NULL, INDEX \`IDX_4610bfeee5e6ced8a5bea8fd81\` (\`filmsUrl\`), INDEX \`IDX_81cf8c17fec2bd68e775b20737\` (\`planetsUrl\`), PRIMARY KEY (\`filmsUrl\`, \`planetsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_rel\` (\`filmsUrl\` varchar(255) NOT NULL, \`starshipsUrl\` varchar(255) NOT NULL, INDEX \`IDX_1aa8ba8847b27c22283705e962\` (\`filmsUrl\`), INDEX \`IDX_39675ca344e1058a917735a482\` (\`starshipsUrl\`), PRIMARY KEY (\`filmsUrl\`, \`starshipsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_rel\` (\`filmsUrl\` varchar(255) NOT NULL, \`vehiclesUrl\` varchar(255) NOT NULL, INDEX \`IDX_788dfb78c89a5a626fca76f41e\` (\`filmsUrl\`), INDEX \`IDX_7b8f94a7c7582a68342cd7a21d\` (\`vehiclesUrl\`), PRIMARY KEY (\`filmsUrl\`, \`vehiclesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_rel\` (\`filmsUrl\` varchar(255) NOT NULL, \`speciesUrl\` varchar(255) NOT NULL, INDEX \`IDX_07bd259e872d694f078f1c5f82\` (\`filmsUrl\`), INDEX \`IDX_246f48dbb67217aa13abed83f3\` (\`speciesUrl\`), PRIMARY KEY (\`filmsUrl\`, \`speciesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_609aca3a2f74ce1bc351251be75\` FOREIGN KEY (\`homeworld\`) REFERENCES \`planets\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planets_people_rel\` ADD CONSTRAINT \`FK_07e255db76adf826af8b3e60e15\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planets_people_rel\` ADD CONSTRAINT \`FK_1f16ee7540ab592d7b3a55b91f9\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` ADD CONSTRAINT \`FK_bd40bbbf318f65cf81b1213b32e\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` ADD CONSTRAINT \`FK_099771bcf6574c476fdcab844a8\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` ADD CONSTRAINT \`FK_b7798949a877a28df4dead718b5\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` ADD CONSTRAINT \`FK_1bd0f228680817fd63d5adb6f82\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` ADD CONSTRAINT \`FK_6bf7a7200c71f0d41c0f8887ee8\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` ADD CONSTRAINT \`FK_24319c3dfc91c3de84962b1d897\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` ADD CONSTRAINT \`FK_b0b462b723da40bece470a998bc\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` ADD CONSTRAINT \`FK_abbfa6b6c8e6a435cd0d7c86a60\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` ADD CONSTRAINT \`FK_4610bfeee5e6ced8a5bea8fd812\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` ADD CONSTRAINT \`FK_81cf8c17fec2bd68e775b20737d\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` ADD CONSTRAINT \`FK_1aa8ba8847b27c22283705e9620\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` ADD CONSTRAINT \`FK_39675ca344e1058a917735a482e\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` ADD CONSTRAINT \`FK_788dfb78c89a5a626fca76f41e9\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` ADD CONSTRAINT \`FK_7b8f94a7c7582a68342cd7a21d2\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` ADD CONSTRAINT \`FK_07bd259e872d694f078f1c5f822\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` ADD CONSTRAINT \`FK_246f48dbb67217aa13abed83f3c\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` DROP FOREIGN KEY \`FK_246f48dbb67217aa13abed83f3c\``);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` DROP FOREIGN KEY \`FK_07bd259e872d694f078f1c5f822\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` DROP FOREIGN KEY \`FK_7b8f94a7c7582a68342cd7a21d2\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` DROP FOREIGN KEY \`FK_788dfb78c89a5a626fca76f41e9\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` DROP FOREIGN KEY \`FK_39675ca344e1058a917735a482e\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` DROP FOREIGN KEY \`FK_1aa8ba8847b27c22283705e9620\``);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` DROP FOREIGN KEY \`FK_81cf8c17fec2bd68e775b20737d\``);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` DROP FOREIGN KEY \`FK_4610bfeee5e6ced8a5bea8fd812\``);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` DROP FOREIGN KEY \`FK_abbfa6b6c8e6a435cd0d7c86a60\``);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` DROP FOREIGN KEY \`FK_b0b462b723da40bece470a998bc\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` DROP FOREIGN KEY \`FK_24319c3dfc91c3de84962b1d897\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` DROP FOREIGN KEY \`FK_6bf7a7200c71f0d41c0f8887ee8\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` DROP FOREIGN KEY \`FK_1bd0f228680817fd63d5adb6f82\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` DROP FOREIGN KEY \`FK_b7798949a877a28df4dead718b5\``);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` DROP FOREIGN KEY \`FK_099771bcf6574c476fdcab844a8\``);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` DROP FOREIGN KEY \`FK_bd40bbbf318f65cf81b1213b32e\``);
        await queryRunner.query(`ALTER TABLE \`planets_people_rel\` DROP FOREIGN KEY \`FK_1f16ee7540ab592d7b3a55b91f9\``);
        await queryRunner.query(`ALTER TABLE \`planets_people_rel\` DROP FOREIGN KEY \`FK_07e255db76adf826af8b3e60e15\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_609aca3a2f74ce1bc351251be75\``);
        await queryRunner.query(`DROP INDEX \`IDX_246f48dbb67217aa13abed83f3\` ON \`films_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_07bd259e872d694f078f1c5f82\` ON \`films_species_rel\``);
        await queryRunner.query(`DROP TABLE \`films_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_7b8f94a7c7582a68342cd7a21d\` ON \`films_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_788dfb78c89a5a626fca76f41e\` ON \`films_vehicles_rel\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_39675ca344e1058a917735a482\` ON \`films_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_1aa8ba8847b27c22283705e962\` ON \`films_starships_rel\``);
        await queryRunner.query(`DROP TABLE \`films_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_81cf8c17fec2bd68e775b20737\` ON \`films_palnets_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_4610bfeee5e6ced8a5bea8fd81\` ON \`films_palnets_rel\``);
        await queryRunner.query(`DROP TABLE \`films_palnets_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_abbfa6b6c8e6a435cd0d7c86a6\` ON \`films_people_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0b462b723da40bece470a998b\` ON \`films_people_rel\``);
        await queryRunner.query(`DROP TABLE \`films_people_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_24319c3dfc91c3de84962b1d89\` ON \`people_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_6bf7a7200c71f0d41c0f8887ee\` ON \`people_starships_rel\``);
        await queryRunner.query(`DROP TABLE \`people_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_1bd0f228680817fd63d5adb6f8\` ON \`people_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_b7798949a877a28df4dead718b\` ON \`people_vehicles_rel\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_099771bcf6574c476fdcab844a\` ON \`people_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd40bbbf318f65cf81b1213b32\` ON \`people_species_rel\``);
        await queryRunner.query(`DROP TABLE \`people_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f16ee7540ab592d7b3a55b91f\` ON \`planets_people_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_07e255db76adf826af8b3e60e1\` ON \`planets_people_rel\``);
        await queryRunner.query(`DROP TABLE \`planets_people_rel\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP INDEX \`REL_609aca3a2f74ce1bc351251be7\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
    }

}
