import { Injectable } from '@nestjs/common';
import { DeleteUserOutputDto } from '../dto/delete-user.output.dto';

@Injectable()
export class DeleteUserAssembler {
  toOutputDto(): DeleteUserOutputDto {
    const message = 'User deleted succesfully';
    const dto = new DeleteUserOutputDto();

    dto.message = message;

    return dto;
  }
}