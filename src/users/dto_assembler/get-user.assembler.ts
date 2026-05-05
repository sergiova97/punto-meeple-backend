import { Injectable } from '@nestjs/common';
import { GetUserOutputDto } from '../dto/get-user.output.dto';
import { User } from '../user.entity';

@Injectable()
export class GetUserAssembler {
  toOutputDto(user: User): GetUserOutputDto {
    const dto = new GetUserOutputDto();

    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.surname = user.surname;
    dto.birthdate = user.birthdate;
    dto.registerDate = user.registerDate;

    return dto;
  }

  toOutputDtoList(users: User[]): GetUserOutputDto[] {
    return users.map((user) => this.toOutputDto(user));
  }
}
