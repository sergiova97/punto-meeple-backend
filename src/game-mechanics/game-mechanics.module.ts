import { Module } from '@nestjs/common';
import { GameMechanicsController } from './game-mechanics.controller';
import { GameMechanicsService } from './game-mechanics.service';
import { GetGameMechanicAssembler } from './dto_assembler/get-game-mechanic.assembler';
import { CreateGameMechanicAssembler } from './dto_assembler/create-game-mechanic.assembler';
import { UpdateGameMechanicAssembler } from './dto_assembler/update-game-mechanic.assembler';
import { DeleteGameMechanicAssembler } from './dto_assembler/delete-game-mechanic.assembler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameMechanic } from './game-mechanic.entity';
import { Game } from '../games/game.entity';
import { GameCategory } from '../game-categories/game-category.entity';

@Module({
  controllers: [GameMechanicsController],
  providers: [
    GameMechanicsService,
    GetGameMechanicAssembler,
    CreateGameMechanicAssembler,
    UpdateGameMechanicAssembler,
    DeleteGameMechanicAssembler,
  ],
  imports: [TypeOrmModule.forFeature([GameMechanic, Game, GameCategory])],
})
export class GameMechanicsModule {}
