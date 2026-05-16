import { Injectable } from '@nestjs/common';
import { GameCategory } from '../game-category.entity';
import { UpdateGameCategoryInputDto } from '../dto/update-game-category.input.dto';
import { UpdateGameCategoryOutputDto } from '../dto/update-game-category.output.dto';

@Injectable()
export class UpdateGameCategoryAssembler {
  toEntity(
    gameCategory: GameCategory,
    dto: UpdateGameCategoryInputDto,
  ): GameCategory {
    gameCategory.name = dto.name;

    return gameCategory;
  }

  toOutputDto(gameCategory: GameCategory): UpdateGameCategoryOutputDto {
    const dto = new UpdateGameCategoryOutputDto();

    dto.id = gameCategory.id;
    dto.name = gameCategory.name;

    return dto;
  }
}
