import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { MembershipFee } from '../membership-fees/membership-fee.entity';
import { CreatePaymentAssembler } from './dto_assembler/create-payment.assembler';

@Module({
  providers: [PaymentsService, CreatePaymentAssembler],
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Payment, MembershipFee])],
})
export class PaymentsModule {}
