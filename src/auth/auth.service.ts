import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/user.entity';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async getAuth(id: string): Promise<Auth> {
    const auth = await this.authRepository.findOne(id, { relations: ['user'] });
    console.log(auth);
    return auth;
  }

  async signUp(createAuthDto: CreateAuthDto): Promise<User> {
    const user = await this.usersRepository.createUser();
    const auth = await this.authRepository.createAuth(createAuthDto, user);
    return auth.user;
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
