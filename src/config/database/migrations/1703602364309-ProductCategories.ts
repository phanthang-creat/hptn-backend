import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ProductCategories1703602364309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'productCategories',
                columns: [
                    {
                      name: 'id',
                      type: 'varchar',
                      length: '36',
                      isPrimary: true,
                      isUnique: true,
                    },
                    {
                      name: 'name',
                      type: 'varchar',
                      length: '255',
                      isNullable: false,
                    },
                    {
                      name: 'slug',
                      type: 'varchar',
                      length: '255',
                      isNullable: false,
                      isUnique: true,
                    },
                    {
                      name: 'image',
                      type: 'varchar',
                      length: '255',
                      isNullable: false,
                    },
                    {
                      name: 'description',
                      type: 'text',
                      isNullable: true,
                    },
                    {
                      name: 'parentId',
                      type: 'varchar',
                      length: '36',
                      isNullable: true,
                    },
                    {
                      name: 'order',
                      type: 'int',
                      default: 1,
                      isNullable: false,
                    },
                    {
                      name: 'enabled',
                      type: 'boolean',
                      default: true,
                      isNullable: false,
                    },
                    {
                      name: 'createdAt',
                      type: 'datetime',
                      default: 'CURRENT_TIMESTAMP',
                      isNullable: false,
                    },
                    {
                      name: 'updatedAt',
                      type: 'datetime',
                      default: 'CURRENT_TIMESTAMP',
                      onUpdate: 'CURRENT_TIMESTAMP',
                      isNullable: false,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('productCategories');
    }

}
