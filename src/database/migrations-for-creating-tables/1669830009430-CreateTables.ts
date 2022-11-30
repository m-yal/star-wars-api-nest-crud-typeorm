import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1669830009430 implements MigrationInterface {
    name = 'CreateTables1669830009430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planets\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`residents\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NULL, \`language\` varchar(255) NOT NULL, \`people\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`pilots\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`pilots\` text NOT NULL, \`films\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworld\` text NOT NULL, \`films\` text NOT NULL, \`species\` text NOT NULL, \`vehicles\` text NOT NULL, \`starships\` text NOT NULL, \`homeworldRelUrl\` varchar(255) NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` text NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`characters\` text NOT NULL, \`planets\` text NOT NULL, \`starships\` text NOT NULL, \`vehicles\` text NOT NULL, \`species\` text NOT NULL, PRIMARY KEY (\`url\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_characters_rel_people\` (\`filmsUrl\` varchar(255) NOT NULL, \`peopleUrl\` varchar(255) NOT NULL, INDEX \`IDX_f2b73e1d4ff029dfe13d352147\` (\`filmsUrl\`), INDEX \`IDX_b14b5d1a748e44ad1e44265219\` (\`peopleUrl\`), PRIMARY KEY (\`filmsUrl\`, \`peopleUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets_rel_planets\` (\`filmsUrl\` varchar(255) NOT NULL, \`planetsUrl\` varchar(255) NOT NULL, INDEX \`IDX_65a7596638b785ebb1da232f16\` (\`filmsUrl\`), INDEX \`IDX_a93febf8518803631ebb32301c\` (\`planetsUrl\`), PRIMARY KEY (\`filmsUrl\`, \`planetsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_rel_starships\` (\`filmsUrl\` varchar(255) NOT NULL, \`starshipsUrl\` varchar(255) NOT NULL, INDEX \`IDX_176ef4cf0a30e67b0a817bbcbc\` (\`filmsUrl\`), INDEX \`IDX_a3bf1335cd62b945d92ef7c4d1\` (\`starshipsUrl\`), PRIMARY KEY (\`filmsUrl\`, \`starshipsUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_rel_vehicles\` (\`filmsUrl\` varchar(255) NOT NULL, \`vehiclesUrl\` varchar(255) NOT NULL, INDEX \`IDX_324989184c98dc7a7c1086d4ad\` (\`filmsUrl\`), INDEX \`IDX_053d6b5e314ed57d025a3764c5\` (\`vehiclesUrl\`), PRIMARY KEY (\`filmsUrl\`, \`vehiclesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_rel_species\` (\`filmsUrl\` varchar(255) NOT NULL, \`speciesUrl\` varchar(255) NOT NULL, INDEX \`IDX_8975c1f6a0658a4390a2faf112\` (\`filmsUrl\`), INDEX \`IDX_b004897eed63fdaec9fed5dceb\` (\`speciesUrl\`), PRIMARY KEY (\`filmsUrl\`, \`speciesUrl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_af68631abfa06a49abf61b20226\` FOREIGN KEY (\`homeworldRelUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_characters_rel_people\` ADD CONSTRAINT \`FK_f2b73e1d4ff029dfe13d352147a\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_characters_rel_people\` ADD CONSTRAINT \`FK_b14b5d1a748e44ad1e442652192\` FOREIGN KEY (\`peopleUrl\`) REFERENCES \`people\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets_rel_planets\` ADD CONSTRAINT \`FK_65a7596638b785ebb1da232f16f\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets_rel_planets\` ADD CONSTRAINT \`FK_a93febf8518803631ebb32301c1\` FOREIGN KEY (\`planetsUrl\`) REFERENCES \`planets\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel_starships\` ADD CONSTRAINT \`FK_176ef4cf0a30e67b0a817bbcbc8\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel_starships\` ADD CONSTRAINT \`FK_a3bf1335cd62b945d92ef7c4d18\` FOREIGN KEY (\`starshipsUrl\`) REFERENCES \`starships\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel_vehicles\` ADD CONSTRAINT \`FK_324989184c98dc7a7c1086d4ad8\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel_vehicles\` ADD CONSTRAINT \`FK_053d6b5e314ed57d025a3764c59\` FOREIGN KEY (\`vehiclesUrl\`) REFERENCES \`vehicles\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_rel_species\` ADD CONSTRAINT \`FK_8975c1f6a0658a4390a2faf1123\` FOREIGN KEY (\`filmsUrl\`) REFERENCES \`films\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_rel_species\` ADD CONSTRAINT \`FK_b004897eed63fdaec9fed5dceb1\` FOREIGN KEY (\`speciesUrl\`) REFERENCES \`species\`(\`url\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_species_rel_species\` DROP FOREIGN KEY \`FK_b004897eed63fdaec9fed5dceb1\``);
        await queryRunner.query(`ALTER TABLE \`films_species_rel_species\` DROP FOREIGN KEY \`FK_8975c1f6a0658a4390a2faf1123\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel_vehicles\` DROP FOREIGN KEY \`FK_053d6b5e314ed57d025a3764c59\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel_vehicles\` DROP FOREIGN KEY \`FK_324989184c98dc7a7c1086d4ad8\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel_starships\` DROP FOREIGN KEY \`FK_a3bf1335cd62b945d92ef7c4d18\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel_starships\` DROP FOREIGN KEY \`FK_176ef4cf0a30e67b0a817bbcbc8\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_rel_planets\` DROP FOREIGN KEY \`FK_a93febf8518803631ebb32301c1\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_rel_planets\` DROP FOREIGN KEY \`FK_65a7596638b785ebb1da232f16f\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_rel_people\` DROP FOREIGN KEY \`FK_b14b5d1a748e44ad1e442652192\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_rel_people\` DROP FOREIGN KEY \`FK_f2b73e1d4ff029dfe13d352147a\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_af68631abfa06a49abf61b20226\``);
        await queryRunner.query(`DROP INDEX \`IDX_b004897eed63fdaec9fed5dceb\` ON \`films_species_rel_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_8975c1f6a0658a4390a2faf112\` ON \`films_species_rel_species\``);
        await queryRunner.query(`DROP TABLE \`films_species_rel_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_053d6b5e314ed57d025a3764c5\` ON \`films_vehicles_rel_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_324989184c98dc7a7c1086d4ad\` ON \`films_vehicles_rel_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_rel_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3bf1335cd62b945d92ef7c4d1\` ON \`films_starships_rel_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_176ef4cf0a30e67b0a817bbcbc\` ON \`films_starships_rel_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships_rel_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_a93febf8518803631ebb32301c\` ON \`films_planets_rel_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_65a7596638b785ebb1da232f16\` ON \`films_planets_rel_planets\``);
        await queryRunner.query(`DROP TABLE \`films_planets_rel_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_b14b5d1a748e44ad1e44265219\` ON \`films_characters_rel_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2b73e1d4ff029dfe13d352147\` ON \`films_characters_rel_people\``);
        await queryRunner.query(`DROP TABLE \`films_characters_rel_people\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
    }

}
