import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: add user
  // async addUser(): User {}

  //TODO: delete user
  // async deleteUser(): User {}
}
