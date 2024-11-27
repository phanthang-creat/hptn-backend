import { Test, TestingModule } from '@nestjs/testing';
import { TrialRegistraionController } from './trial-registraion.controller';
import { TrialRegistraionService } from './trial-registraion.service';

describe('TrialRegistraionController', () => {
  let controller: TrialRegistraionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrialRegistraionController],
      providers: [TrialRegistraionService],
    }).compile();

    controller = module.get<TrialRegistraionController>(TrialRegistraionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
