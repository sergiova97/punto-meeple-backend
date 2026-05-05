import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { AssignRolesOutputDto } from '../dto/assign-roles.output.dto';

@Injectable()
export class AssignRolesAssembler {
  toOutputDto(user: User): AssignRolesOutputDto {
    return {
      id: user.id,
      email: user.email,
      roles: user.roles?.map((r) => r.name) || [],
    };
  }
}
