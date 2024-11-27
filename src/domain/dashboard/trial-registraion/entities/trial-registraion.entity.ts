import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { uuidv7 } from "uuidv7";
import { TrialCourse } from "../../trial-course/entities/trial-course.entity";

@Entity('trialRegistrations')
export class TrialRegistraion {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    studentName!: string;

    @Column({ type: 'int' })
    studentAge!: number;

    @Column({ type: 'varchar', length: 255 })
    parentName!: string;

    @Column({ type: 'varchar', length: 255 })
    parentPhone!: string;

    @Column({ type: 'int', nullable: true })
    trialCourseId!: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => TrialCourse, trialCourse => trialCourse.trialRegistrations)
    @JoinColumn({ name: 'trialCourseId' })
    trialCourse!: TrialCourse;

    @BeforeInsert()
    generateId() {
        this.id = uuidv7();
    }
}
