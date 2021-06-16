import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  VerifiedCallback,
  VerifyCallback,
} from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../users/users.repository';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const { id, deviceId } = payload;
    const user = await this.usersRepository.findOne(id);
    if (user) done(null, user);
  }
}
