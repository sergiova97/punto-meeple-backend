import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipFee } from './membership-fee.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateMembershipFeeAssembler } from './dto_assembler/create-membership-fee.assembler';
import { CreateMembershipFeeInputDto } from './dto/create-membership-fee.input.dto';
import { GenerateMembershipFeesInputDto } from './dto/generate-membership-fees.input.dto';

@Injectable()
export class MembershipFeesService {
  constructor(
    @InjectRepository(MembershipFee)
    private feeRepo: Repository<MembershipFee>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private assembler: CreateMembershipFeeAssembler,
  ) {}

  async create(dto: CreateMembershipFeeInputDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const entity = this.assembler.toEntity(dto, user);

    const saved = await this.feeRepo.save(entity);

    return this.assembler.toOutputDto(saved);
  }

  async generateFees(dto: GenerateMembershipFeesInputDto) {
    const users = await this.userRepo.findByIds(dto.userIds);

    if (users.length !== dto.userIds.length) {
      throw new NotFoundException('Some users not found');
    }

    const fees: MembershipFee[] = [];

    for (const user of users) {
      for (const period of dto.periods) {
        const existingFee = await this.feeRepo.findOne({
          where: {
            user: { id: user.id },
            period,
          },
        });

        if (existingFee) {
          existingFee.price = dto.price;
          fees.push(existingFee);
          continue;
        }

        const fee = this.feeRepo.create({
          user: user,
          period,
          price: dto.price,
        });

        fees.push(fee);
      }
    }

    const saved = await this.feeRepo.save(fees);

    return {
      created: saved.length,
    };
  }
}
