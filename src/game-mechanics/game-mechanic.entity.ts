import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../games/game.entity';

@Entity()
export class GameMechanic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Game, (game) => game.mechanics)
  games: Game[];
}
