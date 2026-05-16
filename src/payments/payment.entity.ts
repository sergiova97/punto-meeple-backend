import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MembershipFee } from '../membership-fees/membership-fee.entity';
import { PaymentMethod } from './payment-method.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.TRANSFER,
  })
  method: PaymentMethod;

  @Column()
  reference: string;

  @OneToMany(() => MembershipFee, (membershipFee) => membershipFee.payment)
  membershipFees: MembershipFee[];
}
