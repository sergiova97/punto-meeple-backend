import { Module } from '@nestjs/common';
import { MembershipFeesService } from './membership-fees.service';
import { MembershipFeesController } from './membership-fees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipFee } from './membership-fee.entity';
import { CreateMembershipFeeAssembler } from './dto_assembler/create-membership-fee.assembler';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';

@Module({
  providers: [MembershipFeesService, CreateMembershipFeeAssembler],
  controllers: [MembershipFeesController],
  imports: [TypeOrmModule.forFeature([MembershipFee, User, Payment])]
})
export class MembershipFeesModule {}
