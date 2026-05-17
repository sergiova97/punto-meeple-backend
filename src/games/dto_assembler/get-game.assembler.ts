import { Injectable } from '@nestjs/common';
import { GetGameOutputDto } from '../dto/get-game.output.dto';
import { Game } from '../game.entity';

@Injectable()
export class GetGameAssembler {
  toOutputDto(game: Game): GetGameOutputDto {
    const dto = new GetGameOutputDto();

    dto.id = game.id;
    dto.name = game.name;
    dto.description = game.description;
    dto.duration = game.duration;
    dto.minPlayers = game.minPlayers;
    dto.maxPlayers = game.maxPlayers;
    dto.publisher = game.publisher;
    dto.type = game.type;
    dto.categories = game.categories ?? [];
    dto.mechanics = game.mechanics ?? [];

    return dto;
  }

  toOutputDtoList(game: Game[]): GetGameOutputDto[] {
    return game.map((game) => this.toOutputDto(game));
  }
}
