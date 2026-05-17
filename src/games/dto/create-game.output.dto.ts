import { GameType } from '../game-type.enum';

export class CreateGameOutputDto {
  id: number;
  name: string;
  description: string;
  duration: number | null;
  minPlayers: number | null;
  maxPlayers: number | null;
  publisher: string;
  type: GameType;
  categoryIds: number[];
  mechanicIds: number[];
}
