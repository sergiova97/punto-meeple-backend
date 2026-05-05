import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { MembershipFee } from '../membership-fees/membership-fee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  surname: string;

  @Column({ type: 'date' })
  birthdate: string;

  @CreateDateColumn({ type: 'timestamp' })
  registerDate: Date;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => MembershipFee, (membershipFee) => membershipFee.user)
  membershipFees: MembershipFee[];
}
