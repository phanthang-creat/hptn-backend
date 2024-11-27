import { Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'postCategoriesClosure_closure',
  synchronize: false,
})
export class PostCategoryClosureEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    nullable: false,
    name: 'ancestorid',
  })
  ancestorid!: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 36,
    nullable: false,
    name: 'descendantid',
  })
  descendantid!: string;
}
