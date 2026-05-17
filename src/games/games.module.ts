import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GetGameAssembler } from './dto_assembler/get-game.assembler';
import { CreateGameAssembler } from './dto_assembler/create-game.assembler';
import { UpdateGameAssembler } from './dto_assembler/update-game.assembler';
import { DeleteGameAssembler } from './dto_assembler/delete-game.assembler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameMechanic } from '../game-mechanics/game-mechanic.entity';
import { GameCategory } from '../game-categories/game-category.entity';
import { Game } from './game.entity';
import { GameType } from './game-type.enum';

@Module({
  providers: [
    GamesService,
    GetGameAssembler,
    CreateGameAssembler,
    UpdateGameAssembler,
    DeleteGameAssembler,
  ],
  controllers: [GamesController],
  imports: [
    TypeOrmModule.forFeature([Game, GameMechanic, GameCategory]),
  ],
})
export class GamesModule {}
