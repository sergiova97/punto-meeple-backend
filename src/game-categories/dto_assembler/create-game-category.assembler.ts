import { Injectable } from '@nestjs/common';
import { CreateGameCategoryInputDto } from '../dto/create-game-category.input.dto';
import { CreateGameCategoryOutputDto } from '../dto/create-game-category.output.dto';
import { GameCategory } from '../game-category.entity';

@Injectable()
export class CreateGameCategoryAssembler {
  toEntity(dto: CreateGameCategoryInputDto): GameCategory {
    const gameCategory = new GameCategory();

    gameCategory.name = dto.name;

    return gameCategory;
  }

  toOutputDto(gameCategory: GameCategory): CreateGameCategoryOutputDto {
    const dto = new CreateGameCategoryOutputDto();

    dto.id = gameCategory.id;
    dto.name = gameCategory.name;

    return dto;
  }
}
