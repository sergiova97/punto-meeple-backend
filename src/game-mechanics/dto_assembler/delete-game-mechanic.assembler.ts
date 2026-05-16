import { Injectable } from '@nestjs/common';
import { DeleteGameMechanicOutputDto } from '../dto/delete-game-mechanic.output.dto';

@Injectable()
export class DeleteGameMechanicAssembler {
  toOutputDto(): DeleteGameMechanicOutputDto {
    const message = 'Game mechanic deleted succesfully';
    const dto = new DeleteGameMechanicOutputDto();

    dto.message = message;

    return dto;
  }
}
