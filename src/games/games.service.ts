import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetGameAssembler } from './dto_assembler/get-game.assembler';
import { CreateGameAssembler } from './dto_assembler/create-game.assembler';
import { UpdateGameAssembler } from './dto_assembler/update-game.assembler';
import { DeleteGameAssembler } from './dto_assembler/delete-game.assembler';
import { Game } from './game.entity';
import { CreateGameInputDto } from './dto/create-game.input.dto';
import { GameMechanic } from '../game-mechanics/game-mechanic.entity';
import { GameCategory } from '../game-categories/game-category.entity';
import { UpdateGameInputDto } from './dto/update-game.input.dto';
import { DeleteGameInputDto } from './dto/delete-game.input.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepo: Repository<Game>,

    @InjectRepository(GameCategory)
    private gameCategoryRepo: Repository<GameCategory>,

    @InjectRepository(GameMechanic)
    private gameMechanicRepo: Repository<GameMechanic>,

    private getAssembler: GetGameAssembler,
    private createAssembler: CreateGameAssembler,
    private updateAssembler: UpdateGameAssembler,
    private deleteAssembler: DeleteGameAssembler,
  ) {}

  async findAll() {
    const games = await this.gameRepo.find({
      relations: ['categories', 'mechanics'],
    });

    return this.getAssembler.toOutputDtoList(games);
  }

  async findOne(id: number) {
    const game = await this.gameRepo.findOne({
      where: {
        id: id,
      },
      relations: ['categories', 'mechanics'],
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return this.getAssembler.toOutputDto(game);
  }

  async create(dto: CreateGameInputDto) {
    const game = this.createAssembler.toEntity(dto);
    game.categories = await this.gameCategoryRepo.findByIds(dto.categoryIds);
    game.mechanics = await this.gameMechanicRepo.findByIds(dto.mechanicIds);

    await this.gameRepo.save(game);

    return this.createAssembler.toOutputDto(game);
  }

  async update(dto: UpdateGameInputDto) {
    const game = await this.gameRepo.findOneBy({ id: dto.id });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const updatedGame = this.updateAssembler.toEntity(game, dto);
    updatedGame.categories = await this.gameCategoryRepo.findByIds(
      dto.categoryIds,
    );
    updatedGame.mechanics = await this.gameMechanicRepo.findByIds(
      dto.mechanicIds,
    );

    await this.gameRepo.save(updatedGame);

    return this.updateAssembler.toOutputDto(updatedGame);
  }

  async delete(dto: DeleteGameInputDto) {
    const game = await this.gameRepo.findOneBy({ id: dto.id });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    await this.gameRepo.remove(game);

    return this.deleteAssembler.toOutputDto();
  }
}
