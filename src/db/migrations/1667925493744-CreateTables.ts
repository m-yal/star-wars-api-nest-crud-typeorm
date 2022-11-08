import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1667925493744 implements MigrationInterface {
    name = 'CreateTables1667925493744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`height\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`height\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`mass\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`mass\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`mass\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`mass\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`people\` DROP COLUMN \`height\``);
        await queryRunner.query(`ALTER TABLE \`people\` ADD \`height\` int NOT NULL`);
    }

}
