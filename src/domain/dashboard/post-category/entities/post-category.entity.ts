import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
  Tree,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';
import { PostCategoryImage } from '../../post-category-image/entities/post-category-image.entity';
import { uuidv7 } from 'uuidv7';
// import { PostEntity } from '../../post/entities/post.entity';

@Entity('postCategories')
@Tree('closure-table', {
  closureTableName: 'postCategoriesClosure',
  ancestorColumnName: (column) => 'ancestor' + column.propertyName,
  descendantColumnName: (column) => 'descendant' + column.propertyName,
})
export class PostCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'uuid', nullable: true })
  parentId!: string;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({ type: 'boolean', nullable: false, default: 1, name: 'enabled' })
  enabled!: boolean;

  @UpdateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Column({ type: 'int', nullable: false, default: 1 })
  order!: number;

  @TreeParent()
  parent?: PostCategoryEntity | null;

  @TreeChildren()
  children?: PostCategoryEntity[] | null;

  @OneToMany(() => PostEntity, (post) => post.category)
  @JoinColumn({ name: 'id', referencedColumnName: 'postCategoryId' })
  posts!: PostEntity[];

  @OneToMany(() => PostCategoryImage, (image) => image.postCategory)
  @JoinColumn({ name: 'id', referencedColumnName: 'postCategoryId' })
  images!: PostCategoryImage[];

  @BeforeInsert()
  beforeInsertActions() {
      this.id = uuidv7();
  }
}
