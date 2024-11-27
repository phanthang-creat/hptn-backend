import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostCategoriesClosureTableMigrations
  implements MigrationInterface
{
  name = 'Migrations1703350953692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`postCategoriesClosure_closure\` (\`ancestorid\` varchar(36) NOT NULL, \`descendantid\` varchar(36) NOT NULL, INDEX \`IDX_ae03ec70885585532edf0ce731\` (\`ancestorid\`), INDEX \`IDX_02a22a8989104ad77d7448447e\` (\`descendantid\`), PRIMARY KEY (\`ancestorid\`, \`descendantid\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postCategoriesClosure_closure\` ADD CONSTRAINT \`FK_ae03ec70885585532edf0ce731c\` FOREIGN KEY (\`ancestorid\`) REFERENCES \`postCategories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`postCategoriesClosure_closure\` ADD CONSTRAINT \`FK_02a22a8989104ad77d7448447e2\` FOREIGN KEY (\`descendantid\`) REFERENCES \`postCategories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`postCategoriesClosure_closure\` DROP FOREIGN KEY \`FK_02a22a8989104ad77d7448447e2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`postCategoriesClosure_closure\` DROP FOREIGN KEY \`FK_ae03ec70885585532edf0ce731c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_02a22a8989104ad77d7448447e\` ON \`postCategoriesClosure_closure\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ae03ec70885585532edf0ce731\` ON \`postCategoriesClosure_closure\``,
    );
    await queryRunner.query(`DROP TABLE \`postCategoriesClosure_closure\``);
  }
}
