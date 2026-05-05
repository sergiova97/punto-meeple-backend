import { IsNumber, IsString } from 'class-validator';

export class CreateMembershipFeeInputDto {
  @IsNumber()
  userId: number;

  @IsString()
  period: string;

  @IsNumber()
  price: number;
}
