import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TrialRegistration1703918831999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "trialRegistrations",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                    },
                    {
                        name: "studentName",
                        type: "varchar",
                        isNullable: false,
                        default: '""'
                    },
                    {
                        name: "studentAge",
                        type: "int",
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: "parentName",
                        type: "varchar",
                        isNullable: false,
                        default: '""'
                    },
                    {
                        name: "parentPhone",
                        type: "varchar",
                        isNullable: false,
                        default: '""'
                    },
                    {
                        name: "trialCourseId",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "current_timestamp"
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "current_timestamp"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FK_trialCourseId",
                        columnNames: ["trialCourseId"],
                        referencedTableName: "trialCourses",
                        referencedColumnNames: ["id"],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("trialRegistrations")
    }

}
