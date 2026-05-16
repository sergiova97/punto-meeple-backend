import { IsString } from 'class-validator';

export class CreateGameCategoryInputDto {
  @IsString()
  name: string;
}
