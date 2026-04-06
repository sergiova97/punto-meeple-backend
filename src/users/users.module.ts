import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserAssembler } from './dto_assembler/create-user.assembler';
import { GetUserAssembler } from './dto_assembler/get-user.assembler';
import { UpdateUserAssembler } from './dto_assembler/update-user.assembler';
import { DeleteUserAssembler } from './dto_assembler/delete-user.assembler';

@Module({
  providers: [
    UsersService,
    GetUserAssembler,
    CreateUserAssembler,
    UpdateUserAssembler,
    DeleteUserAssembler,
  ],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
