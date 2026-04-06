import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '../dto/create-user.input.dto';
import { User } from '../users.entity';
import { CreateUserOutputDto } from '../dto/create-user.output.dto';

@Injectable()
export class CreateUserAssembler {
  toEntity(dto: CreateUserInputDto): User {
    const user = new User();

    user.email = dto.email;
    user.password = dto.password;
    user.name = dto.name;
    user.surname = dto.surname;
    user.birthdate = dto.birthdate;

    return user;
  }

  toOutputDto(user: User): CreateUserOutputDto {
    const dto = new CreateUserOutputDto();

    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.surname = user.surname;
    dto.birthdate = user.birthdate;
    dto.registerDate = user.registerDate;

    return dto;
  }
}
