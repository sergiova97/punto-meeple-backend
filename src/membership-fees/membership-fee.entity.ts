import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { MembershipFeeStatus } from './membership-fee-status.enum';
import { Payment } from '../payments/payment.entity';

@Entity()
export class MembershipFee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.membershipFees, { eager: true })
  user: User;

  @Column()
  period: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: MembershipFeeStatus,
    default: MembershipFeeStatus.PENDING,
  })
  status: MembershipFeeStatus;

  @ManyToOne(() => Payment, (payment) => payment.membershipFees, {
    nullable: true,
  })
  @JoinColumn()
  payment: Payment | null;

}