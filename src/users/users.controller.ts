import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //TODO: add users
  // async addUser(): User {}

  //TODO: delete users
  // async deleteUser(): User {}
}
