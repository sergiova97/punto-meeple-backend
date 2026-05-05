import { Test, TestingModule } from '@nestjs/testing';
import { MembershipFeesController } from './membership-fees.controller';

describe('MembershipFeesController', () => {
  let controller: MembershipFeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipFeesController],
    }).compile();

    controller = module.get<MembershipFeesController>(MembershipFeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
