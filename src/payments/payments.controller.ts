import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentInputDto } from './dto/create-payment.input.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentInputDto) {
    return this.service.createPayment(dto);
  }
}
