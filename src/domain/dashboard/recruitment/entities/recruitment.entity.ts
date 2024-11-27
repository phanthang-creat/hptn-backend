import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecruitmentType } from '../../recruitment-type/entities/recruitment-type.entity';
import { RecruitmentPosition } from '../../recruitment-position/entities/recruitment-position.entity';
import { Application } from '../../application/entities/application.entity';

@Entity('recruitments')
export class Recruitment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'title' })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'slug' })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'image' })
  image!: string;

  @Column({ type: 'text', nullable: true, name: 'description' })
  description!: string;

  @Column({ type: 'text', nullable: true, name: 'shortContent' })
  shortContent!: string;

  @Column({ type: 'longtext', nullable: true, name: 'content' })
  content!: string;

  @Column({ type: 'boolean', nullable: false, default: false, name: 'enabled' })
  enabled!: boolean;

  @Column({ type: 'int', nullable: true, default: null, name: 'typeId' })
  typeId!: number;

  @Column({ type: 'int', nullable: true, default: null, name: 'positionId' })
  positionId!: number;

  @Column({ type: 'text', nullable: true, name: 'address' })
  address!: string;

  @Column({ type: 'datetime', nullable: false, name: 'createdAt' })
  createdAt!: Date;

  @Column({ type: 'datetime', nullable: false, name: 'updatedAt' })
  updatedAt!: Date;

  @ManyToOne(() => RecruitmentType, (type) => type.recruitments)
  type!: RecruitmentType;

  @ManyToOne(() => RecruitmentPosition, (position) => position.recruitments)
  position!: RecruitmentPosition;

  @OneToMany(() => Application, (application) => application.recruitment)
  @JoinColumn({ name: 'id', referencedColumnName: 'recruitmentId' })
  applications!: Application[];
}
