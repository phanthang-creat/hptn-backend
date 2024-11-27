import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueKeyForPostSlug1703428939766
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE posts ADD CONSTRAINT post_slug_unique UNIQUE (slug);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE posts DROP CONSTRAINT post_slug_unique;
        `);
  }
}
