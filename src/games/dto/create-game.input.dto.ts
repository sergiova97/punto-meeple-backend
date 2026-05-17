import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GameType } from '../game-type.enum';

export class CreateGameInputDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  minPlayers?: number;

  @IsOptional()
  @IsNumber()
  maxPlayers?: number;

  @IsString()
  publisher: string;

  @IsEnum(GameType)
  type: GameType;

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  mechanicIds: number[];
}
