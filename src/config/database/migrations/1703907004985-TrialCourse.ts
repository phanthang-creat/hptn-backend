import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TrialCourse1703907004985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "trialCourses",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "name",
                        type: "varchar"
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
                ]
            })
        ),
        await queryRunner.query("INSERT INTO trialCourses (name) VALUES ('Vỡ lòng (Beginning)'), ('Căn bản (Basic)'), ('Sơ cấp (Pre-Intermediate)'), ('Nâng cao (Advanced)'), ('Năng khiếu (Excellent)')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("trialCourse")
    }

}
