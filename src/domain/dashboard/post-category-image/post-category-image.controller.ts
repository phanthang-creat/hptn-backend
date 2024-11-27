import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostCategoryImageService } from './post-category-image.service';
import { CreatePostCategoryImageDto } from './dto/create-post-category-image.dto';
import { UpdatePostCategoryImageDto } from './dto/update-post-category-image.dto';

@Controller('post-category-image')
export class PostCategoryImageController {
  constructor(private readonly postCategoryImageService: PostCategoryImageService) {}

  @Post()
  create(@Body() createPostCategoryImageDto: CreatePostCategoryImageDto) {
    return this.postCategoryImageService.create(createPostCategoryImageDto);
  }

  @Get()
  findAll() {
    return this.postCategoryImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postCategoryImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostCategoryImageDto: UpdatePostCategoryImageDto) {
    return this.postCategoryImageService.update(+id, updatePostCategoryImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postCategoryImageService.remove(+id);
  }
}
