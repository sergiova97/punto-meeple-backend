import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameType } from './game-type.enum';
import { GameCategory } from '../game-categories/game-category.entity';
import { GameMechanic } from '../game-mechanics/game-mechanic.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', nullable: true })
  duration: number | null;

  @Column({ type: 'int', nullable: true })
  minPlayers: number | null;

  @Column({ type: 'int', nullable: true })
  maxPlayers: number | null;

  @Column()
  publisher: string;

  @Column({
    type: 'enum',
    enum: GameType,
  })
  type: GameType;

  @ManyToMany(() => GameCategory, (category) => category.games, {
    cascade: true,
  })
  @JoinTable()
  categories: GameCategory[];

  @ManyToMany(() => GameMechanic, (mechanic) => mechanic.games, {
    cascade: true,
  })
  @JoinTable()
  mechanics: GameMechanic[];
}
