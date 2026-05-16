import { Injectable } from '@nestjs/common';
import { GameCategory } from '../game-category.entity';
import { GetGameCategoryOutputDto } from '../dto/get-game-category.output.dto';

@Injectable()
export class GetGameCategoryAssembler {
  toOutputDto(gameCategory: GameCategory): GetGameCategoryOutputDto {
    const dto = new GetGameCategoryOutputDto();

    dto.id = gameCategory.id;
    dto.name = gameCategory.name;

    return dto;
  }

  toOutputDtoList(gameCategories: GameCategory[]): GetGameCategoryOutputDto[] {
    return gameCategories.map((gameCategory) =>
      this.toOutputDto(gameCategory),
    );
  }
}
