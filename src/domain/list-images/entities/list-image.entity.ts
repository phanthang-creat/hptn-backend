import { Column, PrimaryGeneratedColumn } from "typeorm";

export class ListImage {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar' })
    url!: string;
}
