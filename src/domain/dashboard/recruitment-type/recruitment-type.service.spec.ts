import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentTypeService } from './recruitment-type.service';

describe('RecruitmentTypeService', () => {
  let service: RecruitmentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitmentTypeService],
    }).compile();

    service = module.get<RecruitmentTypeService>(RecruitmentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
