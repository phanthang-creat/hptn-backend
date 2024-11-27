// import { CreatePostCategoryClosureDto } from '../dto/create-post-category-closure.dto';
// import { PostCategoryClosureService } from './../../post-category-closure/post-category-closure.service';
// import { BaseTransaction } from "src/provider/database/mariadb/maraidb.transaction";
// import { CreatePostCategoryDto } from "../dto/create-post-category.dto";
// import { PostCategoryEntity } from "../entities/post-category.entity";
// import { DataSource, EntityManager } from 'typeorm';

// export class CreatePostCategoryTransaction extends BaseTransaction<CreatePostCategoryDto, PostCategoryEntity> {
//     constructor(
//         dataSource: DataSource,
//         private postCategoryClosureService: PostCategoryClosureService,
//     ) {
//         super(dataSource);
//     }

//     protected async execute(
//         data: CreatePostCategoryDto,
//         manager: EntityManager,
//     ): Promise<PostCategoryEntity> {
//         const postCategoryEntity = manager.create(PostCategoryEntity, data);
//         const newPostCategory = await manager.save(postCategoryEntity);

//         // save post category closure
//         if (data.parentId) {
//             const createPostCategoryClosureDto: CreatePostCategoryClosureDto = {
//                 ancestorid: data.parentId,
//                 descendantid: newPostCategory.id,
//             };

//             await this.postCategoryClosureService.create(createPostCategoryClosureDto);
//         }

//         return newPostCategory;
//     }
// }
