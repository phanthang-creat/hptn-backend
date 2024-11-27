import { Test, TestingModule } from '@nestjs/testing';
import { TrialCourseService } from './trial-course.service';

describe('TrialCourseService', () => {
  let service: TrialCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialCourseService],
    }).compile();

    service = module.get<TrialCourseService>(TrialCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
