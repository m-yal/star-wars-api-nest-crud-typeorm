import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1675593972547 implements MigrationInterface {
    name = 'CreateTables1675593972547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`files\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` enum ('user', 'admin') NOT NULL, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_70a170f032a2ca04a6ec6eb2d9\` (\`name\`), UNIQUE INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`homeworldId\` int NULL, UNIQUE INDEX \`IDX_1adf701cac3b2c0f8bacb54774\` (\`name\`), UNIQUE INDEX \`IDX_86eba64ed08b3673df47cca655\` (\`url\`), UNIQUE INDEX \`REL_3427f7c92316561d7131c296bc\` (\`homeworldId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_41580e76da7903fb3827a3510e\` (\`name\`), UNIQUE INDEX \`IDX_9feba736ac458e843a5df80ff1\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_aa397b791341ed3615397050d4\` (\`name\`), UNIQUE INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworldId\` int NULL, UNIQUE INDEX \`IDX_e7ec00b080e693706a6eaa6d31\` (\`name\`), UNIQUE INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL DEFAULT 'unknown', \`created\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` longtext NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` date NOT NULL, UNIQUE INDEX \`IDX_936e1cc7dc8c65844638219255\` (\`name\`), UNIQUE INDEX \`IDX_6c40323ce20cc863369cc33ee8\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species_species\` (\`peopleId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_d6d545e4740ee652e6f79e9ffd\` (\`peopleId\`), INDEX \`IDX_9232984d4ee14342ad97f44382\` (\`speciesId\`), PRIMARY KEY (\`peopleId\`, \`speciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles_vehicles\` (\`peopleId\` int NOT NULL, \`vehiclesId\` int NOT NULL, INDEX \`IDX_a7b8cbe95c602d58ade9845ce6\` (\`peopleId\`), INDEX \`IDX_f872d6f9465604601135f41970\` (\`vehiclesId\`), PRIMARY KEY (\`peopleId\`, \`vehiclesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships_starships\` (\`peopleId\` int NOT NULL, \`starshipsId\` int NOT NULL, INDEX \`IDX_78e90ed25ace2390fa2c7a4d50\` (\`peopleId\`), INDEX \`IDX_0a5517fc734c462fc3a0d32eb9\` (\`starshipsId\`), PRIMARY KEY (\`peopleId\`, \`starshipsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_characters_people\` (\`filmsId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_ca23a410c5afe74468664fc093\` (\`filmsId\`), INDEX \`IDX_8f835d0e20d5e12a9d1eff662f\` (\`peopleId\`), PRIMARY KEY (\`filmsId\`, \`peopleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets_planets\` (\`filmsId\` int NOT NULL, \`planetsId\` int NOT NULL, INDEX \`IDX_59f34f486757575a016c375061\` (\`filmsId\`), INDEX \`IDX_956e9e10fd96ed618538bb2b96\` (\`planetsId\`), PRIMARY KEY (\`filmsId\`, \`planetsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_starships\` (\`filmsId\` int NOT NULL, \`starshipsId\` int NOT NULL, INDEX \`IDX_3965a3d69c030eca6799a06d9d\` (\`filmsId\`), INDEX \`IDX_e79353f238988153784b207757\` (\`starshipsId\`), PRIMARY KEY (\`filmsId\`, \`starshipsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_vehicles\` (\`filmsId\` int NOT NULL, \`vehiclesId\` int NOT NULL, INDEX \`IDX_21c53d0d80b975c872a4ca4ada\` (\`filmsId\`), INDEX \`IDX_a623eaa88213329f69118cdea5\` (\`vehiclesId\`), PRIMARY KEY (\`filmsId\`, \`vehiclesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_species\` (\`filmsId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_be1d816ce6bdc4677080067eb4\` (\`filmsId\`), INDEX \`IDX_6042e3f9819bb64e4264509f73\` (\`speciesId\`), PRIMARY KEY (\`filmsId\`, \`speciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_3427f7c92316561d7131c296bc6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_8f79bb098a482fa585da15ef3a6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` ADD CONSTRAINT \`FK_d6d545e4740ee652e6f79e9ffd5\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` ADD CONSTRAINT \`FK_9232984d4ee14342ad97f443824\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` ADD CONSTRAINT \`FK_a7b8cbe95c602d58ade9845ce63\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` ADD CONSTRAINT \`FK_f872d6f9465604601135f419704\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` ADD CONSTRAINT \`FK_78e90ed25ace2390fa2c7a4d50c\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` ADD CONSTRAINT \`FK_0a5517fc734c462fc3a0d32eb99\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` ADD CONSTRAINT \`FK_ca23a410c5afe74468664fc0936\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` ADD CONSTRAINT \`FK_8f835d0e20d5e12a9d1eff662fd\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` ADD CONSTRAINT \`FK_59f34f486757575a016c3750616\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` ADD CONSTRAINT \`FK_956e9e10fd96ed618538bb2b96c\` FOREIGN KEY (\`planetsId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_3965a3d69c030eca6799a06d9d7\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_e79353f238988153784b207757c\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_21c53d0d80b975c872a4ca4ada3\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_a623eaa88213329f69118cdea5d\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_be1d816ce6bdc4677080067eb4b\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_6042e3f9819bb64e4264509f73e\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_6042e3f9819bb64e4264509f73e\``);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_be1d816ce6bdc4677080067eb4b\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_a623eaa88213329f69118cdea5d\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_21c53d0d80b975c872a4ca4ada3\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_e79353f238988153784b207757c\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_3965a3d69c030eca6799a06d9d7\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` DROP FOREIGN KEY \`FK_956e9e10fd96ed618538bb2b96c\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planets\` DROP FOREIGN KEY \`FK_59f34f486757575a016c3750616\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` DROP FOREIGN KEY \`FK_8f835d0e20d5e12a9d1eff662fd\``);
        await queryRunner.query(`ALTER TABLE \`films_characters_people\` DROP FOREIGN KEY \`FK_ca23a410c5afe74468664fc0936\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` DROP FOREIGN KEY \`FK_0a5517fc734c462fc3a0d32eb99\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` DROP FOREIGN KEY \`FK_78e90ed25ace2390fa2c7a4d50c\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` DROP FOREIGN KEY \`FK_f872d6f9465604601135f419704\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` DROP FOREIGN KEY \`FK_a7b8cbe95c602d58ade9845ce63\``);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` DROP FOREIGN KEY \`FK_9232984d4ee14342ad97f443824\``);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` DROP FOREIGN KEY \`FK_d6d545e4740ee652e6f79e9ffd5\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_8f79bb098a482fa585da15ef3a6\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_3427f7c92316561d7131c296bc6\``);
        await queryRunner.query(`DROP INDEX \`IDX_6042e3f9819bb64e4264509f73\` ON \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_be1d816ce6bdc4677080067eb4\` ON \`films_species_species\``);
        await queryRunner.query(`DROP TABLE \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_a623eaa88213329f69118cdea5\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_21c53d0d80b975c872a4ca4ada\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e79353f238988153784b207757\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_3965a3d69c030eca6799a06d9d\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_956e9e10fd96ed618538bb2b96\` ON \`films_planets_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_59f34f486757575a016c375061\` ON \`films_planets_planets\``);
        await queryRunner.query(`DROP TABLE \`films_planets_planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f835d0e20d5e12a9d1eff662f\` ON \`films_characters_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca23a410c5afe74468664fc093\` ON \`films_characters_people\``);
        await queryRunner.query(`DROP TABLE \`films_characters_people\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a5517fc734c462fc3a0d32eb9\` ON \`people_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_78e90ed25ace2390fa2c7a4d50\` ON \`people_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`people_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_f872d6f9465604601135f41970\` ON \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7b8cbe95c602d58ade9845ce6\` ON \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_9232984d4ee14342ad97f44382\` ON \`people_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6d545e4740ee652e6f79e9ffd\` ON \`people_species_species\``);
        await queryRunner.query(`DROP TABLE \`people_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c40323ce20cc863369cc33ee8\` ON \`films\``);
        await queryRunner.query(`DROP INDEX \`IDX_936e1cc7dc8c65844638219255\` ON \`films\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3d026dcae4b855e5ac3dc7834\` ON \`people\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7ec00b080e693706a6eaa6d31\` ON \`people\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP INDEX \`IDX_5355e93a3aeb7ca9456a5a9dc3\` ON \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa397b791341ed3615397050d4\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_9feba736ac458e843a5df80ff1\` ON \`starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_41580e76da7903fb3827a3510e\` ON \`starships\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP INDEX \`REL_3427f7c92316561d7131c296bc\` ON \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_86eba64ed08b3673df47cca655\` ON \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_1adf701cac3b2c0f8bacb54774\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_de8e5a046e3a80e5ac3d776e83\` ON \`planets\``);
        await queryRunner.query(`DROP INDEX \`IDX_70a170f032a2ca04a6ec6eb2d9\` ON \`planets\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`files\``);
    }

}
