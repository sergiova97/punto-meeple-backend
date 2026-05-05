import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class AssignRolesInputDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  roleIds: number[];
}
