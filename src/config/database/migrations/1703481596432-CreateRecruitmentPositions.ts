import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRecruitmentPositions1703481596432
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'recruitmentPositions',
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
            INSERT INTO recruitmentPositions (name, slug) VALUES ('Giáo viên', 'giao-vien'), ('Giảng viên', 'giang-vien'), ('Trợ giảng', 'tro-giang'), ('Quản lý', 'quan-ly'), ('Thực tập sinh', 'thuc-tap-sinh'), ('Thư ký', 'thu-ky'), ('Nhân viên', 'nhan-vien'), ('Khác', 'khac')
        `);
    // INSERT INTO recruitmentPositions (name) VALUES ('Giáo viên'), ('Giảng viên'), ('Trợ giảng'), ('Quản lý'), ('Thực tập sinh'), ('Thư ký'), ('Nhân viên'), ('Khác')
    // INSERT INTO recruitmentCategories (name) VALUES ('Trợ giảng');
    // INSERT INTO recruitmentCategories (name) VALUES ('Quản lý');
    // INSERT INTO recruitmentCategories (name) VALUES ('Thực tập sinh');
    // INSERT INTO recruitmentCategories (name) VALUES ('Thư ký');
    // INSERT INTO recruitmentCategories (name) VALUES ('Nhân viên');
    // INSERT INTO recruitmentCategories (name) VALUES ('Khác');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recruitmentPositions');
  }
}
