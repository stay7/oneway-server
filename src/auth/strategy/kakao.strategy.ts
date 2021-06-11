import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../users/users.repository';
import { AuthProvider } from '../auth-provider.enum';
import { AuthRepository } from '../auth.repository';
import { CreateAuthDto } from '../dto/create-auth.dto';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const { id } = profile;

    const auth = await this.authRepository.findOne(id);
    if (auth) {
      done(null, auth.user);
    } else {
      const createAuthDto: CreateAuthDto = {
        providerKey: id,
        provider: AuthProvider.KAKAO,
      };
      const user = await this.usersRepository.createUser();
      const auth = await this.authRepository.createAuth(createAuthDto, user);
      done(null, auth.user);
    }
  }
}
