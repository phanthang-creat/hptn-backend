import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentPositionService } from './recruitment-position.service';

describe('RecruitmentPositionService', () => {
  let service: RecruitmentPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitmentPositionService],
    }).compile();

    service = module.get<RecruitmentPositionService>(
      RecruitmentPositionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
