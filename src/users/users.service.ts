import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { AuthRepository } from '../auth/auth.repository';
import { GroupsRepository } from '../groups/groups.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    @InjectRepository(GroupsRepository)
    private groupsRepository: GroupsRepository,
  ) {}

  getUser(getUserDto: GetUserDto): Promise<User> {
    return this.usersRepository.findOne(getUserDto);
  }

  async signUp(createAuthDto: CreateAuthDto): Promise<User> {
    const user = await this.usersRepository.createUser();
    const auth = await this.authRepository.createAuth(createAuthDto, user);
    const group = await this.groupsRepository.createGroup(
      { name: 'New Group' },
      user,
    );
    return auth.user;
  }

  login() {}
}
