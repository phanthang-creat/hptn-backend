import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDataTypeOfPost1703430545897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE posts
            MODIFY COLUMN description TEXT NOT NULL DEFAULT ''
        `);
    await queryRunner.query(`
            ALTER TABLE posts
            MODIFY COLUMN shortContent TEXT NOT NULL DEFAULT ''
        `);
    await queryRunner.query(`
            ALTER TABLE posts
            MODIFY COLUMN content LONGTEXT NOT NULL DEFAULT ''
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE posts
            MODIFY COLUMN description TEXT NOT NULL DEFAULT ''
        `);
    await queryRunner.query(`
            ALTER TABLE posts
            MODIFY COLUMN shortContent TEXT NOT NULL DEFAULT ''
        `);
    await queryRunner.query(`
            ALTER TABLE posts
            MODIFY COLUMN content TEXT NOT NULL DEFAULT ''
        `);
  }
}
