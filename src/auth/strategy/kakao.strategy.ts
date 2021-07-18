import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthProvider } from '../auth-provider.enum';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @Inject('AuthService') private authService: AuthService,
    @Inject('UserService') private usersService: UsersService,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id } = profile;
    const auth = await this.authService.getAuth(id);

    if (auth) {
      done(null, auth.user);
    } else {
      const user = await this.usersService.signUp({
        providerKey: id,
        provider: AuthProvider.KAKAO,
      });
      done(null, user);
    }
  }
}
