import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';
import { GetUser } from './get-user.decorator';
import { User } from '../users/user.entity';
import { Logger } from 'nestjs-pino';
import { GetPayload } from './get-payload.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('google');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const [id, code] = this.authService.issueCode(req);
    return res.redirect(`relay://success?id=${id}&code=${code}`);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    console.log('auth/kakao');
  }

  /*
    login을 위한 code(jwt)를 발급
   */
  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  kakaoAuthRedirect(@Req() req, @Res() res) {
    const [id, code] = this.authService.issueCode(req);
    return res.redirect(`relay://success?id=${id}&code=${code}`);
  }

  // device_id, code를 받음.
  // code 검증 후 access, refresh 토큰 발급
  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  login(@Body() jwtPayload: JwtPayload) {
    const [accessToken, refreshToken] = this.authService.issueToken(jwtPayload);
    return { accessToken, refreshToken };
  }

  //refresh token을 body에 넣어서 보내야한다.
  @Post('renew')
  renewToken(@Body('refreshToken') refreshToken) {
    console.log('renew', refreshToken);
    return this.authService.renewAccessToken(refreshToken);
  }
}
