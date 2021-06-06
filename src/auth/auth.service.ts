import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  googleLogin(req) {
    if (!req.user) {
      return 'No users from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
