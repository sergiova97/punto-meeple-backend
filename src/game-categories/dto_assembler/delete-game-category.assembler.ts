import { Injectable } from '@nestjs/common';
import { DeleteGameCategoryOutputDto } from '../dto/delete-game-category.output.dto';

@Injectable()
export class DeleteGameCategoryAssembler {
  toOutputDto(): DeleteGameCategoryOutputDto {
    const message = 'Game category deleted succesfully';
    const dto = new DeleteGameCategoryOutputDto();

    dto.message = message;

    return dto;
  }
}
