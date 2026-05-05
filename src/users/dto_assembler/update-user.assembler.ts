import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UpdateUserInputDto } from '../dto/update-user.input.dto';
import { UpdateUserOutputDto } from '../dto/update-user.output.dto';

@Injectable()
export class UpdateUserAssembler {
  toEntity(user: User, dto: UpdateUserInputDto): User {
    user.email = dto.email ?? user.email;
    user.name = dto.name ?? user.name;
    user.surname = dto.surname ?? user.surname;
    user.birthdate = dto.birthdate ?? user.birthdate;

    return user;
  }

  toOutputDto(user: User): UpdateUserOutputDto {
    const dto = new UpdateUserOutputDto();

    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.surname = user.surname;
    dto.birthdate = user.birthdate;
    dto.registerDate = user.registerDate;

    return dto;
  }
}