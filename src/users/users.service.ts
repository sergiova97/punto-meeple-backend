import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { CreateUserAssembler } from './dto_assembler/create-user.assembler';
import { GetUserAssembler } from './dto_assembler/get-user.assembler';
import { UpdateUserInputDto } from './dto/update-user.input.dto';
import { UpdateUserAssembler } from './dto_assembler/update-user.assembler';
import { DeleteUserInputDto } from './dto/delete-user.input.dto';
import { DeleteUserAssembler } from './dto_assembler/delete-user.assembler';
import { Role } from '../roles/role.entity';
import { AssignRolesAssembler } from './dto_assembler/assign-roles.assembler';
import { AssignRolesInputDto } from './dto/assig-roles.input.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    private getAssembler: GetUserAssembler,
    private createAssembler: CreateUserAssembler,
    private updateAssembler: UpdateUserAssembler,
    private deleteAssembler: DeleteUserAssembler,
    private assignRolesAssembler: AssignRolesAssembler,
  ) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    const [users, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: this.getAssembler.toOutputDtoList(users),
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getAssembler.toOutputDto(user);
  }

  async create(dto: CreateUserInputDto) {
    const user = this.createAssembler.toEntity(dto);

    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepo.save(user);

    return this.createAssembler.toOutputDto(newUser);
  }

  async update(dto: UpdateUserInputDto) {
    const user = await this.userRepo.findOneBy({ id: dto.id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = this.updateAssembler.toEntity(user, dto);
    const savedUser = await this.userRepo.save(updatedUser);

    return this.updateAssembler.toOutputDto(savedUser);
  }

  async delete(dto: DeleteUserInputDto) {
    const user = await this.userRepo.findOneBy({ id: dto.id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.remove(user);

    return this.deleteAssembler.toOutputDto();
  }

  async assignRoles(dto: AssignRolesInputDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = await this.roleRepo.findBy({
      id: In(dto.roleIds),
    });

    if (roles.length !== dto.roleIds.length) {
      throw new BadRequestException('Some roles do not exist');
    }

    user.roles = roles;

    const saved = await this.userRepo.save(user);

    return this.assignRolesAssembler.toOutputDto(saved);
  }
}
