import { IsNumber } from 'class-validator';

export class DeleteGameInputDto {
  @IsNumber()
  id: number;
}
