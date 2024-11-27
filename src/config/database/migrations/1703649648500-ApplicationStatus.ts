import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ApplicationStatus1703649648500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "applicationStatus",
                columns: [
                    {
                        name: "id",
                        type: "tinyint",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                ]
            })
        )

        await queryRunner.query(`
            INSERT INTO applicationStatus (id, name)
            VALUES (0, 'Pending'),
                   (1, 'Approved'),
                   (2, 'Rejected')
        `)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("application_status")
    }

}
