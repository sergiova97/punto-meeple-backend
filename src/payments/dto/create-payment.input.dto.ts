import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreatePaymentInputDto {
  @IsString()
  reference: string;

  @IsArray()
  @IsNumber({}, { each: true })
  membershipFeeIds: number[];
}
