import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ProductImages1703602368487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'productImages',
                columns: [
                    {
                      name: 'id',
                      type: 'varchar',
                      length: '36',
                      isPrimary: true,
                      isUnique: true,
                    },
                    {
                      name: 'productId',
                      type: 'varchar',
                      length: '36',
                      isNullable: false,
                    },
                    {
                      name: 'image',
                      type: 'varchar',
                      length: '255',
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
                      isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                      name: 'FK_productImages_products_productId',
                      columnNames: ['productId'],
                      referencedTableName: 'products',
                      referencedColumnNames: ['id'],
                      onDelete: 'CASCADE',
                      onUpdate: 'CASCADE',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('productImages');
    }

}
