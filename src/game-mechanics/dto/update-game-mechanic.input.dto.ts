import { IsNumber, IsString } from 'class-validator';

export class UpdateGameMechanicInputDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
