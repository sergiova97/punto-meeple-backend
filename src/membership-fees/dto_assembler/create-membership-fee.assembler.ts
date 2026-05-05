import { Injectable } from '@nestjs/common';
import { CreateMembershipFeeInputDto } from '../dto/create-membership-fee.input.dto';
import { MembershipFee } from '../membership-fee.entity';
import { CreateMembershipFeeOutputDto } from '../dto/create-membership-fee.output.dto';

@Injectable()
export class CreateMembershipFeeAssembler {
  toEntity(dto: CreateMembershipFeeInputDto, user: any): MembershipFee {
    const fee = new MembershipFee();

    fee.user = user;
    fee.period = dto.period;
    fee.price = dto.price;

    return fee;
  }

  toOutputDto(entity: MembershipFee): CreateMembershipFeeOutputDto {
    return {
      id: entity.id,
      userId: entity.user.id,
      period: entity.period,
      price: Number(entity.price),
      status: entity.status,
    };
  }
}
