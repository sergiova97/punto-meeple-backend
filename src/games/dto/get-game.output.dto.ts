import { GameType } from '../game-type.enum';
import { GameCategory } from '../../game-categories/game-category.entity';
import { GameMechanic } from '../../game-mechanics/game-mechanic.entity';

export class GetGameOutputDto {
  id: number;
  name: string;
  description: string;
  duration: number | null;
  minPlayers: number | null;
  maxPlayers: number | null;
  publisher: string;
  type: GameType;
  categories: GameCategory[];
  mechanics: GameMechanic[];
}
