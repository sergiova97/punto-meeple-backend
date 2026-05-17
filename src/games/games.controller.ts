import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameInputDto } from './dto/create-game.input.dto';
import { UpdateGameInputDto } from './dto/update-game.input.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly service: GamesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateGameInputDto) {
    return this.service.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateGameInputDto) {
    return this.service.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete({ id: +id });
  }
}
