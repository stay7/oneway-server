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
import { GetTokenDto } from './dto/get-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async redirectBack(req, res) {
    const { user } = req;
    const tempToken = this.authService.issueTemporaryToken(user);
    return res.redirect(
      new URL(`oneway://success?id=${user.id}&temp_token=${tempToken}`),
    );
  }

  @Post('token')
  @UseGuards(AuthGuard())
  async getToken(@Body() getTokenDto: GetTokenDto) {
    return await this.authService.getToken(getTokenDto);
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
