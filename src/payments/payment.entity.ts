import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MembershipFee } from '../membership-fees/membership-fee.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  date: Date;

  @OneToMany(() => MembershipFee, (membershipFee) => membershipFee.payment)
  membershipFees: MembershipFee[];
}