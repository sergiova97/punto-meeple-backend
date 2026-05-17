import { Injectable } from '@nestjs/common';
import { DeleteGameOutputDto } from '../dto/delete-game.output.dto';

@Injectable()
export class DeleteGameAssembler {
  toOutputDto(): DeleteGameOutputDto {
    const message = 'Game deleted succesfully';
    const dto = new DeleteGameOutputDto();

    dto.message = message;

    return dto;
  }
}
