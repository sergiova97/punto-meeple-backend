import { Injectable } from '@nestjs/common';
import { CreateGameInputDto } from '../dto/create-game.input.dto';
import { Game } from '../game.entity';
import { CreateGameOutputDto } from '../dto/create-game.output.dto';
@Injectable()
export class CreateGameAssembler {
  toEntity(dto: CreateGameInputDto): Game {
    const game = new Game();

    game.name = dto.name;
    game.description = dto.description;
    game.duration = dto.duration ?? null;
    game.minPlayers = dto.minPlayers ?? null;
    game.maxPlayers = dto.maxPlayers ?? null;
    game.publisher = dto.publisher;
    game.type = dto.type;

    return game;
  }

  toOutputDto(game: Game): CreateGameOutputDto {
    const dto = new CreateGameOutputDto();

    dto.id = game.id;
    dto.name = game.name;
    dto.description = game.description;
    dto.duration = game.duration;
    dto.minPlayers = game.minPlayers;
    dto.maxPlayers = game.maxPlayers;
    dto.publisher = game.publisher;
    dto.type = game.type;
    dto.categoryIds = game.categories?.map((c) => c.id) ?? [];
    dto.mechanicIds = game.mechanics?.map((m) => m.id) ?? [];

    return dto;
  }
}
