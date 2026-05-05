import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';

@Module({
  providers: [PaymentsService],
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Payment])],
})
export class PaymentsModule {}
