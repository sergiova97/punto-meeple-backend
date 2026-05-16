import { IsArray, IsNumber, IsString } from 'class-validator';

export class GenerateMembershipFeesInputDto {
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];

  @IsArray()
  @IsString({ each: true })
  periods: string[];

  @IsNumber()
  price: number;
}
