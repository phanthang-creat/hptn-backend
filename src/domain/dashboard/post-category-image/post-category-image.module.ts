import { Module } from '@nestjs/common';
import { PostCategoryImageService } from './post-category-image.service';
// import { PostCategoryImageController } from './post-category-image.controller';

@Module({
  // controllers: [PostCategoryImageController],
  providers: [PostCategoryImageService],
})
export class PostCategoryImageModule {}
