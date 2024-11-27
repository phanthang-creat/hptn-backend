import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnOrderToPostAndPostCategory1703415423215
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE postCategories ADD COLUMN \`order\` INT(11) NOT NULL DEFAULT 1 AFTER \`enabled\`;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE postCategories DROP COLUMN \`order\`;
        `);
  }
}
