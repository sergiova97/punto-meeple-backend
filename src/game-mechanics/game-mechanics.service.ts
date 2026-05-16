import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameMechanic } from './game-mechanic.entity';
import { Repository } from 'typeorm';
import { GetGameMechanicAssembler } from './dto_assembler/get-game-mechanic.assembler';
import { CreateGameMechanicAssembler } from './dto_assembler/create-game-mechanic.assembler';
import { UpdateGameMechanicAssembler } from './dto_assembler/update-game-mechanic.assembler';
import { DeleteGameMechanicAssembler } from './dto_assembler/delete-game-mechanic.assembler';
import { CreateGameMechanicInputDto } from './dto/create-game-mechanic.input.dto';
import { UpdateGameMechanicInputDto } from './dto/update-game-mechanic.input.dto';
import { DeleteGameMechanicInputDto } from './dto/delete-game-mechanic.input.dto';

@Injectable()
export class GameMechanicsService {
  constructor(
    @InjectRepository(GameMechanic)
    private readonly gameMechanicRepo: Repository<GameMechanic>,

    private readonly getAssembler: GetGameMechanicAssembler,
    private readonly createAssembler: CreateGameMechanicAssembler,
    private readonly updateAssembler: UpdateGameMechanicAssembler,
    private readonly deleteAssembler: DeleteGameMechanicAssembler,
  ) {}

  async findAll() {
    const gameMechanics = await this.gameMechanicRepo.find();

    return this.getAssembler.toOutputDtoList(gameMechanics);
  }

  async findOne(id: number) {
    const gameMechanic = await this.gameMechanicRepo.findOneBy({ id: id});

    if (!gameMechanic) {
      throw new NotFoundException('Game Mechanic not found');
    }

    return this.getAssembler.toOutputDto(gameMechanic);
  }

  async create(dto: CreateGameMechanicInputDto){
    const gameMechanic = this.createAssembler.toEntity(dto);

    await this.gameMechanicRepo.save(gameMechanic);

    return this.createAssembler.toOutputDto(gameMechanic);
  }

  async update(dto: UpdateGameMechanicInputDto) {
    const gameMechanic = await this.gameMechanicRepo.findOneBy({ id: dto.id });

    if (!gameMechanic) {
      throw new NotFoundException('Game Mechanic not found');
    }

    const updatedGameMechanic = this.updateAssembler.toEntity(gameMechanic, dto);
    await this.gameMechanicRepo.save(updatedGameMechanic);

    return this.updateAssembler.toOutputDto(updatedGameMechanic);
  }

  async delete(dto: DeleteGameMechanicInputDto) {
    const gameMechanic = await this.gameMechanicRepo.findOneBy({ id: dto.id });

    if (!gameMechanic) {
      throw new NotFoundException('Game Mechanic not found');
    }

    await this.gameMechanicRepo.remove(gameMechanic);

    return this.deleteAssembler.toOutputDto();
  }
}
