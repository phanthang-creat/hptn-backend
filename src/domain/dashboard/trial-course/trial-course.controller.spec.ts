import { Test, TestingModule } from '@nestjs/testing';
import { TrialCourseController } from './trial-course.controller';
import { TrialCourseService } from './trial-course.service';

describe('TrialCourseController', () => {
  let controller: TrialCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrialCourseController],
      providers: [TrialCourseService],
    }).compile();

    controller = module.get<TrialCourseController>(TrialCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
