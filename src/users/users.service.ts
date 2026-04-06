import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { CreateUserAssembler } from './dto_assembler/create-user.assembler';
import { GetUserAssembler } from './dto_assembler/get-user.assembler';
import { UpdateUserInputDto } from './dto/update-user.input.dto';
import { UpdateUserAssembler } from './dto_assembler/update-user.assembler';
import { DeleteUserInputDto } from './dto/delete-user.input.dto';
import { DeleteUserAssembler } from './dto_assembler/delete-user.assembler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private getAssembler: GetUserAssembler,
    private createAssembler: CreateUserAssembler,
    private updateAssembler: UpdateUserAssembler,
    private deleteAssembler: DeleteUserAssembler,
  ) {}

  async findAll() {
    const users = await this.repo.find();

    return this.getAssembler.toOutputDtoList(users);
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getAssembler.toOutputDto(user);
  }

  async create(dto: CreateUserInputDto) {
    const user = this.createAssembler.toEntity(dto);

    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.repo.save(user);

    return this.createAssembler.toOutputDto(newUser);
  }

  async update(dto: UpdateUserInputDto) {
    const user = await this.repo.findOneBy({ id: dto.id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = this.updateAssembler.toEntity(user, dto);
    const savedUser = await this.repo.save(updatedUser);

    return this.updateAssembler.toOutputDto(savedUser);
  }

  async delete(dto: DeleteUserInputDto) {
    const user = await this.repo.findOneBy({ id: dto.id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repo.remove(user);

    return this.deleteAssembler.toOutputDto();
  }
}
