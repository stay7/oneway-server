import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No users from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  kakaoLogin() {}
}
