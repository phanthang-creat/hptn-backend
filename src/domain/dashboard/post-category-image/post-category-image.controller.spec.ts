import { Test, TestingModule } from '@nestjs/testing';
import { PostCategoryImageController } from './post-category-image.controller';
import { PostCategoryImageService } from './post-category-image.service';

describe('PostCategoryImageController', () => {
  let controller: PostCategoryImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCategoryImageController],
      providers: [PostCategoryImageService],
    }).compile();

    controller = module.get<PostCategoryImageController>(PostCategoryImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
