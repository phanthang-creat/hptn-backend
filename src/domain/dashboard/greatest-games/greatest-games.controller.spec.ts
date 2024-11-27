import { Test, TestingModule } from '@nestjs/testing';
import { GreatestGamesController } from './greatest-games.controller';
import { GreatestGamesService } from './greatest-games.service';

describe('GreatestGamesController', () => {
  let controller: GreatestGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreatestGamesController],
      providers: [GreatestGamesService],
    }).compile();

    controller = module.get<GreatestGamesController>(GreatestGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
