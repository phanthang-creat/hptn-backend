import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentTypeController } from './recruitment-type.controller';
import { RecruitmentTypeService } from './recruitment-type.service';

describe('RecruitmentTypeController', () => {
  let controller: RecruitmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentTypeController],
      providers: [RecruitmentTypeService],
    }).compile();

    controller = module.get<RecruitmentTypeController>(
      RecruitmentTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
