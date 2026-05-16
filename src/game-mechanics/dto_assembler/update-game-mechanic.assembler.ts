import { Injectable } from '@nestjs/common';
import { GameMechanic } from '../game-mechanic.entity';
import { UpdateGameMechanicInputDto } from '../dto/update-game-mechanic.input.dto';
import { UpdateGameMechanicOutputDto } from '../dto/update-game-mechanic.output.dto';

@Injectable()
export class UpdateGameMechanicAssembler {
  toEntity(
    gameMechanic: GameMechanic,
    dto: UpdateGameMechanicInputDto,
  ): GameMechanic {
    gameMechanic.name = dto.name;

    return gameMechanic;
  }

  toOutputDto(gameMechanic: GameMechanic): UpdateGameMechanicOutputDto {
    const dto = new UpdateGameMechanicOutputDto();

    dto.id = gameMechanic.id;
    dto.name = gameMechanic.name;

    return dto;
  }
}
