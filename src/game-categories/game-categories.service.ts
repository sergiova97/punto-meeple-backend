import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameCategory } from './game-category.entity';
import { Repository } from 'typeorm';
import { GetGameCategoryAssembler } from './dto_assembler/get-game-category.assembler';
import { CreateGameCategoryAssembler } from './dto_assembler/create-game-category.assembler';
import { UpdateGameCategoryAssembler } from './dto_assembler/update-game-category.assembler';
import { DeleteGameCategoryAssembler } from './dto_assembler/delete-game-category.assembler';
import { CreateGameCategoryInputDto } from './dto/create-game-category.input.dto';
import { UpdateGameCategoryInputDto } from './dto/update-game-category.input.dto';
import { DeleteGameCategoryInputDto } from './dto/delete-game-category.input.dto';

@Injectable()
export class GameCategoriesService {
  constructor(
    @InjectRepository(GameCategory)
    private readonly gameCategoryRepo: Repository<GameCategory>,

    private readonly getAssembler: GetGameCategoryAssembler,
    private readonly createAssembler: CreateGameCategoryAssembler,
    private readonly updateAssembler: UpdateGameCategoryAssembler,
    private readonly deleteAssembler: DeleteGameCategoryAssembler,
  ) {}

  async findAll() {
    const gameCategories = await this.gameCategoryRepo.find();

    return this.getAssembler.toOutputDtoList(gameCategories);
  }

  async findOne(id: number) {
    const gameCategory = await this.gameCategoryRepo.findOneBy({ id: id });

    if (!gameCategory) {
      throw new NotFoundException('Game Category not found');
    }

    return this.getAssembler.toOutputDto(gameCategory);
  }

  async create(dto: CreateGameCategoryInputDto) {
    const gameCategory = this.createAssembler.toEntity(dto);

    await this.gameCategoryRepo.save(gameCategory);

    return this.createAssembler.toOutputDto(gameCategory);
  }

  async update(dto: UpdateGameCategoryInputDto) {
    const gameCategory = await this.gameCategoryRepo.findOneBy({ id: dto.id });

    if (!gameCategory) {
      throw new NotFoundException('Game Category not found');
    }

    const updatedGameCategory = this.updateAssembler.toEntity(
      gameCategory,
      dto,
    );
    await this.gameCategoryRepo.save(updatedGameCategory);

    return this.updateAssembler.toOutputDto(updatedGameCategory);
  }

  async delete(dto: DeleteGameCategoryInputDto) {
    const gameCategory = await this.gameCategoryRepo.findOneBy({ id: dto.id });

    if (!gameCategory) {
      throw new NotFoundException('Game Category not found');
    }

    await this.gameCategoryRepo.remove(gameCategory);

    return this.deleteAssembler.toOutputDto();
  }
}
