import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';

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

  // @Post('login')
  // @UseGuards(AuthGuard('jwt'))
  // login(@Body() loginDto: LoginDto) {
  //   const { id, deviceId, deviceName } = loginDto;
  //
  //   const [accessToken, refreshToken] = this.authSerivce.issueToken({
  //     id,
  //     deviceId,
  //   });
  // }

  /*
    // device_id, code를 받음.
  // code 검증 후 access, refresh 토큰 발급
  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  login(@Body() jwtPayload: JwtPayload) {
    const [accessToken, refreshToken] = this.authService.login(jwtPayload);
    return { accessToken, refreshToken };
  }
   */
}
