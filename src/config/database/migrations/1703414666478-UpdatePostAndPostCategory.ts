import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePostAndPostCategory1703414666478
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('posts', 'status', 'enabled');
    await queryRunner.changeColumn(
      'posts',
      'enabled',
      new TableColumn({
        name: 'enabled',
        type: 'boolean',
        default: true,
        isNullable: false,
      }),
    );
    await queryRunner.renameColumn('postCategories', 'status', 'enabled');
    await queryRunner.changeColumn(
      'postCategories',
      'enabled',
      new TableColumn({
        name: 'enabled',
        type: 'boolean',
        default: true,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('posts', 'enabled', 'status');
    await queryRunner.renameColumn('postCategories', 'enabled', 'status');
  }
}
