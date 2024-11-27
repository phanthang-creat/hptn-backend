import { Test, TestingModule } from '@nestjs/testing';
import { GreatestGamesService } from './greatest-games.service';

describe('GreatestGamesService', () => {
  let service: GreatestGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GreatestGamesService],
    }).compile();

    service = module.get<GreatestGamesService>(GreatestGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
