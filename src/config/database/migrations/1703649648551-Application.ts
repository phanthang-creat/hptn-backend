import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Application1703649648551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "applications",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "fullName",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "dateOfBirth",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "cv",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "recruitmentId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "tinyint",
                        default: 0,
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "current_timestamp",
                        isNullable: false,
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "current_timestamp",
                        isNullable: false,
                        onUpdate: "current_timestamp",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKRecruitment",
                        columnNames: ["recruitmentId"],
                        referencedTableName: "recruitments",
                        referencedColumnNames: ["id"],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKApplicationStatus",
                        columnNames: ["status"],
                        referencedTableName: "applicationStatus",
                        referencedColumnNames: ["id"],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                ],
            }), true, true, true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("applications")
    }

}
