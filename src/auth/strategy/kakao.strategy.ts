import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthProvider } from '../auth-provider.enum';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(@Inject('AuthService') private authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id } = profile;
    const auth = await this.authService.getAuth(id);

    if (auth) return done(null, auth.user);

    const user = await this.authService.createNewUser({
      providerKey: id,
      provider: AuthProvider.KAKAO,
    });
    return done(null, user);
  }
}
