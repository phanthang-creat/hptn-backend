import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatusController } from './application-status.controller';
import { ApplicationStatusService } from './application-status.service';

describe('ApplicationStatusController', () => {
  let controller: ApplicationStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationStatusController],
      providers: [ApplicationStatusService],
    }).compile();

    controller = module.get<ApplicationStatusController>(ApplicationStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
