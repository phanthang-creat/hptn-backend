import { Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'productCategories_closure',
  synchronize: false,
})
export class ProductCategoryClosureEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    nullable: false,
    name: 'ancestor_id',
  })
  ancestorid!: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    nullable: false,
    name: 'descendant_id',
  })
  descendantid!: string;
}
