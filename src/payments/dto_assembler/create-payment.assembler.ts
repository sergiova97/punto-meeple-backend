import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePaymentAssembler {
  toOutput(paymentId: number, feesPaid: number) {
    return {
      paymentId,
      feesPaid,
    };
  }
}
