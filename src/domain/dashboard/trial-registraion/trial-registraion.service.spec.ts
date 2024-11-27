import { Test, TestingModule } from '@nestjs/testing';
import { TrialRegistraionService } from './trial-registraion.service';

describe('TrialRegistraionService', () => {
  let service: TrialRegistraionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialRegistraionService],
    }).compile();

    service = module.get<TrialRegistraionService>(TrialRegistraionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
