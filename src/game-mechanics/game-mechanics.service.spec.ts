import { Test, TestingModule } from '@nestjs/testing';
import { GameMechanicsService } from './game-mechanics.service';

describe('GameMechanicsService', () => {
  let service: GameMechanicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameMechanicsService],
    }).compile();

    service = module.get<GameMechanicsService>(GameMechanicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
