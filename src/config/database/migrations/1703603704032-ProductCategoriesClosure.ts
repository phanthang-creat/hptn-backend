import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ProductCategoriesClosure1703603704032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'productCategories_closure',
                columns: [
                    {
                      name: 'ancestor_id',
                      type: 'varchar',
                      length: '36',
                      isNullable: false,
                      isPrimary: true,
                    },
                    {
                      name: 'descendant_id',
                      type: 'varchar',
                      length: '36',
                      isNullable: false,
                      isPrimary: true,
                    },
                ],
                foreignKeys: [
                    {
                      name: 'FK_productCategoriesClosure_productCategories_ancestor',
                      columnNames: ['ancestor_id'],
                      referencedTableName: 'productCategories',
                      referencedColumnNames: ['id'],
                      onDelete: 'CASCADE',
                      onUpdate: 'CASCADE',
                    },
                    {
                      name: 'FK_productCategoriesClosure_productCategories_descendant',
                      columnNames: ['descendant_id'],
                      referencedTableName: 'productCategories',
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
        await queryRunner.dropTable('productCategories_closure');
    }

}
