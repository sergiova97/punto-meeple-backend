import { IsString } from 'class-validator';

export class CreateGameMechanicInputDto {
  @IsString()
  name: string;
}
