import { Module } from '@nestjs/common';
import { MembershipFeesService } from './membership-fees.service';
import { MembershipFeesController } from './membership-fees.controller';

@Module({
  providers: [MembershipFeesService],
  controllers: [MembershipFeesController]
})
export class MembershipFeesModule {}
