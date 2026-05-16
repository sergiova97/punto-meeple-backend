import { Injectable } from '@nestjs/common';
import { GameMechanic } from '../game-mechanic.entity';
import { CreateGameMechanicInputDto } from '../dto/create-game-mechanic.input.dto';
import { CreateGameMechanicOutputDto } from '../dto/create-game-mechanic.output.dto';

@Injectable()
export class CreateGameMechanicAssembler {
  toEntity(dto: CreateGameMechanicInputDto): GameMechanic {
    const gameMechanic = new GameMechanic();

    gameMechanic.name = dto.name;

    return gameMechanic;
  }

  toOutputDto(gameMechanic: GameMechanic): CreateGameMechanicOutputDto {
    const dto = new CreateGameMechanicOutputDto();

    dto.id = gameMechanic.id;
    dto.name = gameMechanic.name;

    return dto;
  }
}
