import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity('productCategories')
@Tree('closure-table', {
  closureTableName: 'productCategories',
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class ProductCategory {
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
  
  @Column({ type: 'boolean', nullable: false, default: 1, name: 'enabled' })
  enabled!: boolean;
  
  @Column({ type: 'int', nullable: false, default: 1 })
  order!: number;
  
  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
  
  @UpdateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @TreeParent()
  parent?: ProductCategory | null;

  @TreeChildren()
  children?: ProductCategory[] | null;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn({ name: 'id', referencedColumnName: 'categoryId' })
  products!: Product[];
}
