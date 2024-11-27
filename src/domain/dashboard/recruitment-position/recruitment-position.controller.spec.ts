import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentPositionController } from './recruitment-position.controller';
import { RecruitmentPositionService } from './recruitment-position.service';

describe('RecruitmentPositionController', () => {
  let controller: RecruitmentPositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentPositionController],
      providers: [RecruitmentPositionService],
    }).compile();

    controller = module.get<RecruitmentPositionController>(
      RecruitmentPositionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
