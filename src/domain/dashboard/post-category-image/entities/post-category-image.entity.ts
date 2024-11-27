import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { uuidv7 } from "uuidv7";
import { PostCategoryEntity } from "../../post-category/entities/post-category.entity";

@Entity('postCategoryImages')
export class PostCategoryImage {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', nullable: false, name: 'postCategoryId' })
    postCategoryId!: string;

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

    @ManyToOne(() => PostCategoryEntity, (postCategory) => postCategory.images)
    @JoinColumn({ name: 'postCategoryId', referencedColumnName: 'id' })
    postCategory!: PostCategoryEntity;

    @BeforeInsert()
    beforeInsertActions() {
        this.id = uuidv7();
    }
    
}
