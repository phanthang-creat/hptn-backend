import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostCategoryEntity } from '../../post-category/entities/post-category.entity';
// import { PostCategoryEntity } from '../../post-category/entities/post-category.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true })
  shortContent!: string;

  @Column({ type: 'text', nullable: true })
  content!: string;

  @Column({ type: 'varchar', nullable: false, name: 'postCategoryId' })
  postCategoryId!: string;

  @Column({ type: 'boolean', nullable: false, default: 1, name: 'enabled' })
  enabled!: boolean;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @ManyToOne(() => PostCategoryEntity, (postCategory) => postCategory.posts)
  @JoinColumn({ name: 'postCategoryId', referencedColumnName: 'id' })
  category!: PostCategoryEntity;
}
