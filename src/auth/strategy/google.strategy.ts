import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthProvider } from '../auth-provider.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('AuthService') private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id } = profile;
    const auth = await this.authService.getAuth(id);

    if (auth) return done(null, auth.user);

    const user = await this.authService.createNewUser({
      providerKey: id,
      provider: AuthProvider.GOOGLE,
    });
    return done(null, user);
  }
}
