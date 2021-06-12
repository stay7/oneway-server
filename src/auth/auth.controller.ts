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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // console.log(req.user);
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    const { email } = req.user;
    return this.authService.googleLogin(req);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    console.log('auth/kakao');
  }

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  kakaoAuthRedirect(@Req() req, @Res() res) {
    //여기서 code를 주고
    const [id, code] = this.authService.issueCode(req);
    return res.redirect(`relay://success?id=${id}&code=${code}`);
  }

  // device_id, code를 받음.
  // code 검증 후 access, refresh 토큰 발급
  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  login(@Body() loginDto: LoginDto) {
    const { id, deviceId } = loginDto;
    const [accessToken, refreshToken] = this.authService.issueToken(loginDto);
    return { accessToken, refreshToken };
  }
}
