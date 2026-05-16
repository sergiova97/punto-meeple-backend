import { IsNumber, IsString } from 'class-validator';

export class UpdateGameCategoryInputDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
