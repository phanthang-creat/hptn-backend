import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Recruitment } from "../../recruitment/entities/recruitment.entity";
import { uuidv7 } from "uuidv7";
import { ApplicationStatus } from "../../application-status/entities/application-status.entity";

@Entity('applications')
export class Application {
    @PrimaryColumn({ type: 'uuid' })
    id!: string;

    @Column({ type: 'varchar', name: 'fullName' })
    fullName!: string;

    @Column({ type: 'varchar', name: 'email' })
    email!: string;

    @Column({ type: 'varchar', name: 'phone' })
    phone!: string;

    @Column({ type: 'date', name: 'dateOfBirth' })
    dateOfBirth!: Date;

    @Column({ type: 'varchar', name: 'address' })
    address!: string;

    @Column({ type: 'varchar', name: 'cv' })
    cv!: string;

    @Column({ type: 'varchar', name: 'recruitmentId' })
    recruitmentId!: string;

    @Column({ type: 'varchar', name: 'description' })
    description!: string;

    @Column({ type: 'tinyint', name: 'status', default: 0 })
    status!: number;

    @CreateDateColumn({ 
        type: 'datetime', 
        name: 'createdAt',
        default: 'current_timestamp',
    })
    createdAt!: Date;

    @CreateDateColumn({ 
        type: 'datetime', 
        name: 'updatedAt',
        default: 'current_timestamp',
        onUpdate: 'current_timestamp',
    })
    updatedAt!: Date;

    @ManyToOne(() => Recruitment, recruitment => recruitment.applications)
    @JoinColumn({ 
        name: 'recruitmentId', 
        referencedColumnName: 'id' 
    })
    recruitment!: Recruitment;    

    @BeforeInsert()
    updateDate() {
        this.id = uuidv7();
    }

    @ManyToOne(() => ApplicationStatus, applicationStatus => applicationStatus.applications)
    @JoinColumn({ 
        name: 'status', 
        referencedColumnName: 'id' 
    })
    applicationStatus!: ApplicationStatus;
}
