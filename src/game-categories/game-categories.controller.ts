import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GameCategoriesService } from './game-categories.service';
import { CreateGameCategoryInputDto } from './dto/create-game-category.input.dto';
import { UpdateGameCategoryInputDto } from './dto/update-game-category.input.dto';

@Controller('game-categories')
export class GameCategoriesController {
  constructor(private readonly service: GameCategoriesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateGameCategoryInputDto) {
    return this.service.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateGameCategoryInputDto) {
    return this.service.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete({ id: +id });
  }
}
