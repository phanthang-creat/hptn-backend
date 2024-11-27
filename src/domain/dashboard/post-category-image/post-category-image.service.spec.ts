import { Test, TestingModule } from '@nestjs/testing';
import { PostCategoryImageService } from './post-category-image.service';

describe('PostCategoryImageService', () => {
  let service: PostCategoryImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostCategoryImageService],
    }).compile();

    service = module.get<PostCategoryImageService>(PostCategoryImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
