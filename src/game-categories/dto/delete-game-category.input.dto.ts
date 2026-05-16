import { IsNumber } from 'class-validator';

export class DeleteGameCategoryInputDto {
  @IsNumber()
  id: number;
}
