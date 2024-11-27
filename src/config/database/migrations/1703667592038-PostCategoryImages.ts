import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class PostCategoryImages1703667592038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "postCategoryImages",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: "postCategoryId",
                        type: "varchar",
                        length: "36"
                    },
                    {
                        name: "image",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_postCategoryImages_postCategories_postCategoryId",
                        columnNames: ["postCategoryId"],
                        referencedTableName: "postCategories",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("postCategoryImages")
    }

}
