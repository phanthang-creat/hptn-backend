import { Test, TestingModule } from '@nestjs/testing';
import { ListImagesService } from './list-images.service';

describe('ListImagesService', () => {
  let service: ListImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListImagesService],
    }).compile();

    service = module.get<ListImagesService>(ListImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
