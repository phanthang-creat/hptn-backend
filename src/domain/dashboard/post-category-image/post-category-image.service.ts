import { Injectable } from '@nestjs/common';
import { CreatePostCategoryImageDto } from './dto/create-post-category-image.dto';
import { UpdatePostCategoryImageDto } from './dto/update-post-category-image.dto';

@Injectable()
export class PostCategoryImageService {
  create(_createPostCategoryImageDto: CreatePostCategoryImageDto) {
    return 'This action adds a new postCategoryImage';
  }

  findAll() {
    return `This action returns all postCategoryImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postCategoryImage`;
  }

  update(id: number, _updatePostCategoryImageDto: UpdatePostCategoryImageDto) {
    return `This action updates a #${id} postCategoryImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} postCategoryImage`;
  }
}
