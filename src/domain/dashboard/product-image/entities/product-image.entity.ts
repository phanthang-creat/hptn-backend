import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { uuidv7 } from "uuidv7";

@Entity('productImages')
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: false, name: 'productId' })
    productId!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    image!: string;

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

    @ManyToOne(() => Product, (product) => product.images)
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product!: Product;

    @BeforeInsert()
    beforeInsertActions() {
        this.id = uuidv7();
    }
}
