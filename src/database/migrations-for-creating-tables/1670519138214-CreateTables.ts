import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1670519138214 implements MigrationInterface {
    name = 'CreateTables1670519138214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`films\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created\` varchar(255) NULL, \`edited\` varchar(255) NULL, \`url\` varchar(255) NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`title\` varchar(255) NOT NULL DEFAULT 'unknown', \`episode_id\` int NULL, \`opening_crawl\` text NULL, \`director\` varchar(255) NOT NULL DEFAULT 'unknown', \`producer\` varchar(255) NOT NULL DEFAULT 'unknown', \`release_date\` varchar(255) NOT NULL DEFAULT 'unknown', \`characters\` text NULL, \`planets\` text NULL, \`starships\` text NULL, \`vehicles\` text NULL, \`species\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created\` varchar(255) NULL, \`edited\` varchar(255) NULL, \`url\` varchar(255) NULL, \`images\` varchar(255) NOT NULL DEFAULT '', \`name\` varchar(255) NOT NULL DEFAULT 'unknown', \`height\` varchar(255) NOT NULL DEFAULT 'unknown', \`mass\` varchar(255) NOT NULL DEFAULT 'unknown', \`hair_color\` varchar(255) NOT NULL DEFAULT 'unknown', \`skin_color\` varchar(255) NOT NULL DEFAULT 'unknown', \`eye_color\` varchar(255) NOT NULL DEFAULT 'unknown', \`birth_year\` varchar(255) NOT NULL DEFAULT 'unknown', \`gender\` varchar(255) NOT NULL DEFAULT 'unknown', \`homeworld\` varchar(255) NULL, \`films\` text NULL, \`species\` text NULL, \`vehicles\` text NULL, \`starships\` text NULL, \`homeworldRelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_people_rel\` (\`filmsId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_5b704f1eff063497458b79145f\` (\`filmsId\`), INDEX \`IDX_3b0f05a55d6931799cca3e4c00\` (\`peopleId\`), PRIMARY KEY (\`filmsId\`, \`peopleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_palnets_rel\` (\`filmsId\` int NOT NULL, \`planetsId\` int NOT NULL, INDEX \`IDX_6587ceac66ad4a8f577a298446\` (\`filmsId\`), INDEX \`IDX_e72d5695f81baa04650d16227b\` (\`planetsId\`), PRIMARY KEY (\`filmsId\`, \`planetsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_rel\` (\`filmsId\` int NOT NULL, \`starshipsId\` int NOT NULL, INDEX \`IDX_c876c35d31e1cc70c64fc3cadc\` (\`filmsId\`), INDEX \`IDX_81b169aa077ee1db5f33abb49b\` (\`starshipsId\`), PRIMARY KEY (\`filmsId\`, \`starshipsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_rel\` (\`filmsId\` int NOT NULL, \`vehiclesId\` int NOT NULL, INDEX \`IDX_6febc218282981f4617e4f4559\` (\`filmsId\`), INDEX \`IDX_635bc8c26c57f052c05f86910a\` (\`vehiclesId\`), PRIMARY KEY (\`filmsId\`, \`vehiclesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_rel\` (\`filmsId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_6e9e64731d924193fa023dd4cc\` (\`filmsId\`), INDEX \`IDX_dc5623a15aacbba5bcd2803388\` (\`speciesId\`), PRIMARY KEY (\`filmsId\`, \`speciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species_rel\` (\`peopleId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_d23a8131f74aa970eb5243c50e\` (\`peopleId\`), INDEX \`IDX_b85527a95ca49cdcbbe32a586d\` (\`speciesId\`), PRIMARY KEY (\`peopleId\`, \`speciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles_rel\` (\`peopleId\` int NOT NULL, \`vehiclesId\` int NOT NULL, INDEX \`IDX_dd750a7f5dada7f6f9268ca033\` (\`peopleId\`), INDEX \`IDX_a85f5e88a1ff673a6b1a0b3738\` (\`vehiclesId\`), PRIMARY KEY (\`peopleId\`, \`vehiclesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships_rel\` (\`peopleId\` int NOT NULL, \`starshipsId\` int NOT NULL, INDEX \`IDX_add807ab593cc0241193f30664\` (\`peopleId\`), INDEX \`IDX_a7abd85e07338697ce41915543\` (\`starshipsId\`), PRIMARY KEY (\`peopleId\`, \`starshipsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`planets\` ADD \`residents\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`planets\` ADD \`films\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD \`homeworld\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD \`people\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD \`films\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`starships\` ADD \`pilots\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`starships\` ADD \`films\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`pilots\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`films\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_651deb429602ad70fd4b8d80503\` FOREIGN KEY (\`homeworldRel\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_f26997a3c1448e7b6aab6c1de80\` FOREIGN KEY (\`homeworldRelId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` ADD CONSTRAINT \`FK_5b704f1eff063497458b79145f0\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` ADD CONSTRAINT \`FK_3b0f05a55d6931799cca3e4c000\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` ADD CONSTRAINT \`FK_6587ceac66ad4a8f577a298446b\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` ADD CONSTRAINT \`FK_e72d5695f81baa04650d16227b5\` FOREIGN KEY (\`planetsId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` ADD CONSTRAINT \`FK_c876c35d31e1cc70c64fc3cadc7\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` ADD CONSTRAINT \`FK_81b169aa077ee1db5f33abb49b3\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` ADD CONSTRAINT \`FK_6febc218282981f4617e4f45594\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` ADD CONSTRAINT \`FK_635bc8c26c57f052c05f86910ad\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` ADD CONSTRAINT \`FK_6e9e64731d924193fa023dd4cca\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` ADD CONSTRAINT \`FK_dc5623a15aacbba5bcd2803388d\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` ADD CONSTRAINT \`FK_d23a8131f74aa970eb5243c50e5\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` ADD CONSTRAINT \`FK_b85527a95ca49cdcbbe32a586de\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` ADD CONSTRAINT \`FK_dd750a7f5dada7f6f9268ca0331\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` ADD CONSTRAINT \`FK_a85f5e88a1ff673a6b1a0b37380\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` ADD CONSTRAINT \`FK_add807ab593cc0241193f30664b\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` ADD CONSTRAINT \`FK_a7abd85e07338697ce419155432\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` DROP FOREIGN KEY \`FK_a7abd85e07338697ce419155432\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_rel\` DROP FOREIGN KEY \`FK_add807ab593cc0241193f30664b\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` DROP FOREIGN KEY \`FK_a85f5e88a1ff673a6b1a0b37380\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_rel\` DROP FOREIGN KEY \`FK_dd750a7f5dada7f6f9268ca0331\``);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` DROP FOREIGN KEY \`FK_b85527a95ca49cdcbbe32a586de\``);
        await queryRunner.query(`ALTER TABLE \`people_species_rel\` DROP FOREIGN KEY \`FK_d23a8131f74aa970eb5243c50e5\``);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` DROP FOREIGN KEY \`FK_dc5623a15aacbba5bcd2803388d\``);
        await queryRunner.query(`ALTER TABLE \`films_species_rel\` DROP FOREIGN KEY \`FK_6e9e64731d924193fa023dd4cca\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` DROP FOREIGN KEY \`FK_635bc8c26c57f052c05f86910ad\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_rel\` DROP FOREIGN KEY \`FK_6febc218282981f4617e4f45594\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` DROP FOREIGN KEY \`FK_81b169aa077ee1db5f33abb49b3\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_rel\` DROP FOREIGN KEY \`FK_c876c35d31e1cc70c64fc3cadc7\``);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` DROP FOREIGN KEY \`FK_e72d5695f81baa04650d16227b5\``);
        await queryRunner.query(`ALTER TABLE \`films_palnets_rel\` DROP FOREIGN KEY \`FK_6587ceac66ad4a8f577a298446b\``);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` DROP FOREIGN KEY \`FK_3b0f05a55d6931799cca3e4c000\``);
        await queryRunner.query(`ALTER TABLE \`films_people_rel\` DROP FOREIGN KEY \`FK_5b704f1eff063497458b79145f0\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_f26997a3c1448e7b6aab6c1de80\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_651deb429602ad70fd4b8d80503\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`pilots\``);
        await queryRunner.query(`ALTER TABLE \`starships\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`starships\` DROP COLUMN \`pilots\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP COLUMN \`people\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP COLUMN \`homeworld\``);
        await queryRunner.query(`ALTER TABLE \`planets\` DROP COLUMN \`films\``);
        await queryRunner.query(`ALTER TABLE \`planets\` DROP COLUMN \`residents\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7abd85e07338697ce41915543\` ON \`people_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_add807ab593cc0241193f30664\` ON \`people_starships_rel\``);
        await queryRunner.query(`DROP TABLE \`people_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_a85f5e88a1ff673a6b1a0b3738\` ON \`people_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_dd750a7f5dada7f6f9268ca033\` ON \`people_vehicles_rel\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_b85527a95ca49cdcbbe32a586d\` ON \`people_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_d23a8131f74aa970eb5243c50e\` ON \`people_species_rel\``);
        await queryRunner.query(`DROP TABLE \`people_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc5623a15aacbba5bcd2803388\` ON \`films_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_6e9e64731d924193fa023dd4cc\` ON \`films_species_rel\``);
        await queryRunner.query(`DROP TABLE \`films_species_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_635bc8c26c57f052c05f86910a\` ON \`films_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_6febc218282981f4617e4f4559\` ON \`films_vehicles_rel\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_81b169aa077ee1db5f33abb49b\` ON \`films_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_c876c35d31e1cc70c64fc3cadc\` ON \`films_starships_rel\``);
        await queryRunner.query(`DROP TABLE \`films_starships_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_e72d5695f81baa04650d16227b\` ON \`films_palnets_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_6587ceac66ad4a8f577a298446\` ON \`films_palnets_rel\``);
        await queryRunner.query(`DROP TABLE \`films_palnets_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_3b0f05a55d6931799cca3e4c00\` ON \`films_people_rel\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b704f1eff063497458b79145f\` ON \`films_people_rel\``);
        await queryRunner.query(`DROP TABLE \`films_people_rel\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`films\``);
    }

}
