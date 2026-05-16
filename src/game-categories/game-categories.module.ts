import { Module } from '@nestjs/common';
import { GameCategoriesController } from './game-categories.controller';
import { GameCategoriesService } from './game-categories.service';
import { GetGameCategoryAssembler } from './dto_assembler/get-game-category.assembler';
import { CreateGameCategoryAssembler } from './dto_assembler/create-game-category.assembler';
import { UpdateGameCategoryAssembler } from './dto_assembler/update-game-category.assembler';
import { DeleteGameCategoryAssembler } from './dto_assembler/delete-game-category.assembler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCategory } from './game-category.entity';
import { Game } from '../games/game.entity';
import { GameMechanic } from '../game-mechanics/game-mechanic.entity';

@Module({
  controllers: [GameCategoriesController],
  providers: [
    GameCategoriesService,
    GetGameCategoryAssembler,
    CreateGameCategoryAssembler,
    UpdateGameCategoryAssembler,
    DeleteGameCategoryAssembler,
  ],
  imports: [TypeOrmModule.forFeature([GameCategory, Game, GameMechanic])],
})
export class GameCategoriesModule {}
