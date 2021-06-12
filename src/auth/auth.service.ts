import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
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

  issueCode(req) {
    if (req.user) {
      const payload = { id: req.user.id };
      const code = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.CODE_EXPIRE,
      });
      return [req.user.id, code];
    }
  }

  issueToken(loginDto: LoginDto) {
    const { id, deviceId } = loginDto;
    const payload = { id, deviceId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
      secret: process.env.JWT_SECRET,
    });

    return [accessToken, refreshToken];
  }
}
