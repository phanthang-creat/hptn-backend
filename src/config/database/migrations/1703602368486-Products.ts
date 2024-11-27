import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Products1703602368486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        length: '36',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: false,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'shortContent',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'content',
                        type: 'longtext',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'categoryId',
                        type: 'varchar',
                        length: '36',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'enabled',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'current_timestamp()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'datetime',
                        default: 'current_timestamp()',
                        onUpdate: 'current_timestamp()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FK_products_categories_categoryId',
                        columnNames: ['categoryId'],
                        referencedTableName: 'productCategories',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
            }), true, true, true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
