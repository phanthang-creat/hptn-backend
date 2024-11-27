import { PartialType } from '@nestjs/swagger';
import { CreatePostCategoryImageDto } from './create-post-category-image.dto';

export class UpdatePostCategoryImageDto extends PartialType(CreatePostCategoryImageDto) {}
