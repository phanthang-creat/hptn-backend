import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategory } from "../../product-category/entities/product-category.entity";
import { ProductImage } from "../../product-image/entities/product-image.entity";
import { uuidv7 } from "uuidv7";

@Entity('products')
export class Product {
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
  
    @Column({ type: 'text', nullable: true })
    shortContent!: string;
  
    @Column({ type: 'text', nullable: true })
    content!: string;
  
    @Column({ type: 'varchar', nullable: false, name: 'categoryId' })
    categoryId!: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    price!: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    quantity!: number;
  
    @Column({ type: 'boolean', nullable: false, default: 1, name: 'enabled' })
    enabled!: boolean;
  
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
  
    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
    category!: ProductCategory;

    @OneToMany(() => ProductImage, (productImage) => productImage.product)
    @JoinColumn({ name: 'id', referencedColumnName: 'productId' })
    images!: ProductImage[];

    @BeforeInsert()
    beforeInsertActions() {
      this.id = uuidv7();
    }
}
