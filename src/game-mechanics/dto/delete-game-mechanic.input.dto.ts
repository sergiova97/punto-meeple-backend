import { IsNumber } from 'class-validator';

export class DeleteGameMechanicInputDto {
  @IsNumber()
  id: number;
}
