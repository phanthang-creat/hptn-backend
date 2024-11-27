import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "../../application/entities/application.entity";

@Entity('applicationStatus')
export class ApplicationStatus {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', name: 'name' })
    name!: string;

    @OneToMany(() => Application, application => application.applicationStatus)
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'status'
    })
    applications!: Application[];
}
