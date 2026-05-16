import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GameMechanicsService } from './game-mechanics.service';
import { UpdateGameMechanicInputDto } from './dto/update-game-mechanic.input.dto';
import { CreateGameMechanicInputDto } from './dto/create-game-mechanic.input.dto';

@Controller('game-mechanics')
export class GameMechanicsController {
  constructor(private readonly service: GameMechanicsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateGameMechanicInputDto) {
    return this.service.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateGameMechanicInputDto) {
    return this.service.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete({ id: +id });
  }
}
