import { Body, Controller, Post } from '@nestjs/common';
import { MembershipFeesService } from './membership-fees.service';
import { CreateMembershipFeeInputDto } from './dto/create-membership-fee.input.dto';

@Controller('membership-fees')
export class MembershipFeesController {
  constructor(private readonly service: MembershipFeesService) {}

  @Post()
  create(@Body() dto: CreateMembershipFeeInputDto) {
    return this.service.create(dto);
  }
}
