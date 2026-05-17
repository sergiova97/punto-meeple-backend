import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { UpdateUserInputDto } from './dto/update-user.input.dto';
import { AssignRolesInputDto } from './dto/assig-roles.input.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.service.findAll({ page: +page, limit: +limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id); //TODO como Delete
  }

  @Post()
  create(@Body() dto: CreateUserInputDto) {
    return this.service.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateUserInputDto) {
    return this.service.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete({ id: +id });
  }

  @Post('assign-roles')
  assignRoles(@Body() dto: AssignRolesInputDto) {
    return this.service.assignRoles(dto);
  }
}
