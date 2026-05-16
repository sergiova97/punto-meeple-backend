import { Test, TestingModule } from '@nestjs/testing';
import { GameMechanicsController } from './game-mechanics.controller';

describe('GameMechanicsController', () => {
  let controller: GameMechanicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameMechanicsController],
    }).compile();

    controller = module.get<GameMechanicsController>(GameMechanicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
