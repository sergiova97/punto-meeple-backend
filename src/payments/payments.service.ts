import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentInputDto } from './dto/create-payment.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipFee } from '../membership-fees/membership-fee.entity';
import { DataSource, In, Repository } from 'typeorm';
import { PaymentMethod } from './payment-method.enum';
import { Payment } from './payment.entity';
import { MembershipFeeStatus } from '../membership-fees/membership-fee-status.enum';
import { CreatePaymentAssembler } from './dto_assembler/create-payment.assembler';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(MembershipFee)
    private feeRepo: Repository<MembershipFee>,

    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    private assembler: CreatePaymentAssembler,
    private readonly dataSource: DataSource,
  ) {}

  async createPayment(dto: CreatePaymentInputDto) {
    return this.dataSource.transaction(async (manager) => {
      const feeRepo = manager.getRepository(MembershipFee);
      const paymentRepo = manager.getRepository(Payment);

      const fees = await feeRepo.find({
        where: { id: In(dto.membershipFeeIds) },
        relations: ['payment'],
      });

      if (fees.length !== dto.membershipFeeIds.length) {
        throw new NotFoundException('Some fees not found');
      }

      const alreadyPaid = fees.filter((f) => f.payment !== null);
      if (alreadyPaid.length > 0) {
        throw new BadRequestException('Some fees are already paid');
      }

      const payment = paymentRepo.create({
        reference: dto.reference,
        method: PaymentMethod.TRANSFER,
        membershipFees: fees,
      });

      const savedPayment = await paymentRepo.save(payment);

      for (const fee of fees) {
        fee.status = MembershipFeeStatus.PAID;
        fee.payment = savedPayment;
      }

      await feeRepo.save(fees);

      return this.assembler.toOutput(savedPayment.id, fees.length);
    });
  }
}
