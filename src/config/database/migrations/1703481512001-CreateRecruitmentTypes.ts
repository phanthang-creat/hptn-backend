import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRecruitmentTypes1703481512001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'recruitmentTypes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    ),
      queryRunner.query(`
            INSERT INTO recruitmentTypes (name, slug) VALUES ('Part-time', 'part-time'), ('Full-time', 'full-time'), ('Thực tập', 'thuc-tap'), ('Khác', 'khac')
        `);
    // INSERT INTO recruitmentTypes (name) VALUES ('Part-time'), ('Full-time'), ('Thực tập'), ('Khác')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recruitmentTypes');
  }
}
