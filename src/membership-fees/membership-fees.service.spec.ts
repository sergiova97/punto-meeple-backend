import { Test, TestingModule } from '@nestjs/testing';
import { MembershipFeesService } from './membership-fees.service';

describe('MembershipFeesService', () => {
  let service: MembershipFeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipFeesService],
    }).compile();

    service = module.get<MembershipFeesService>(MembershipFeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
