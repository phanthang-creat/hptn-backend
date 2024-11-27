import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrialRegistraion } from "../../trial-registraion/entities/trial-registraion.entity";

@Entity('trialCourses')
export class TrialCourse {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @OneToMany(() => TrialRegistraion, trialRegistraion => trialRegistraion.trialCourse)
    trialRegistrations!: TrialRegistraion[];
}
