import { PartialType } from '@nestjs/swagger';
import { CreatePostCategoryClosureDto } from './create-post-category-closure.dto';

export class UpdatePostCategoryClosureDto extends PartialType(
  CreatePostCategoryClosureDto,
) {}
