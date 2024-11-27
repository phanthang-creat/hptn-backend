import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recruitment } from '../../recruitment/entities/recruitment.entity';

@Entity('recruitmentPositions')
export class RecruitmentPosition {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'slug' })
  slug!: string;

  @Column({ type: 'timestamp', nullable: false, name: 'createdAt' })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: false, name: 'updatedAt' })
  updatedAt!: Date;

  @OneToMany(() => Recruitment, (recruitment) => recruitment.position)
  recruitments!: Recruitment[];
}
