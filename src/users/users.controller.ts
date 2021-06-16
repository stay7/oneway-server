import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('user')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TODO: add users
  // async addUser(): User {}

  //TODO: delete users
  // async deleteUser(): User {}

  @Get()
  getUser(@GetUser() user: User): User {
    return user;
  }
}
