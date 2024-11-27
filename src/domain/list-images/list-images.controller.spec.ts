import { Test, TestingModule } from '@nestjs/testing';
import { ListImagesController } from './list-images.controller';
import { ListImagesService } from './list-images.service';

describe('ListImagesController', () => {
  let controller: ListImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListImagesController],
      providers: [ListImagesService],
    }).compile();

    controller = module.get<ListImagesController>(ListImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
