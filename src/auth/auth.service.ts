import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/user.entity';
import { Auth } from './auth.entity';
import { GroupsRepository } from '../groups/groups.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    @InjectRepository(GroupsRepository)
    private groupRepository: GroupsRepository,
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
    const group = await this.groupRepository.createGroup(
      { name: 'New Group' },
      user,
    );
    console.log(group);
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

  issueToken(jwtPayload: JwtPayload) {
    const { id, deviceId } = jwtPayload;
    const payload = { id, deviceId };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });

    return [accessToken, refreshToken];
  }

  renewAccessToken(refreshToken: string) {
    let returnAccess = '';
    let returnRefresh = refreshToken;

    const verified = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    if (!verified) throw new UnauthorizedException();

    const decoded = this.jwtService.decode(refreshToken);
    const [id, deviceId, exp] = [
      decoded['id'],
      decoded['deviceId'],
      decoded['exp'],
    ];

    const CHECK_DAY_MILLIS =
      parseInt(process.env.REFRESH_TOKEN_RENEW_EXPIRE_DAY) * 3600 * 1000 * 24;

    if (exp * 1000 < Date.now() + CHECK_DAY_MILLIS) {
      const [access, refresh] = this.issueToken({ id, deviceId });
      returnAccess = access;
      returnRefresh = refresh;
    } else {
      returnAccess = this.jwtService.sign(
        { id, deviceId },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        },
      );
    }

    return { accessToken: returnAccess, refreshToken: returnRefresh };
  }
}
