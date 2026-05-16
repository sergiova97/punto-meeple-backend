import { Injectable } from '@nestjs/common';
import { GameMechanic } from '../game-mechanic.entity';
import { GetGameMechanicOutputDto } from '../dto/get-game-mechanic.output.dto';

@Injectable()
export class GetGameMechanicAssembler {
  toOutputDto(gameMechanic: GameMechanic): GetGameMechanicOutputDto {
    const dto = new GetGameMechanicOutputDto();

    dto.id = gameMechanic.id;
    dto.name = gameMechanic.name;

    return dto;
  }

  toOutputDtoList(gameMechanics: GameMechanic[]): GetGameMechanicOutputDto[] {
    return gameMechanics.map((gameMechanic) => this.toOutputDto(gameMechanic));
  }
}
