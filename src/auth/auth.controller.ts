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
import { JwtPayload } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async redirectBack(req, res) {
    const credential = await this.authService.login(req.user);
    const { id, accessToken, refreshToken } = credential;

    const url = new URL('relay://success');
    url.searchParams.append('id', id);
    url.searchParams.append('access_token', accessToken);
    url.searchParams.append('redirect_token', refreshToken);
    console.log(url);
    return res.redirect(url);
  }

  @Post('renew')
  renewToken(@Body('refreshToken') refreshToken) {
    return this.authService.renewAccessToken(refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoAuth() {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    return await this.redirectBack(req, res);
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res) {
    return await this.redirectBack(req, res);
  }

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req, @Res() res) {
    return await this.redirectBack(req, res);
  }
}
