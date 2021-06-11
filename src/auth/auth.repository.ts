import { EntityRepository, Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/user.entity';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async createAuth(createAuthDto: CreateAuthDto, user: User) {
    const auth = this.create({ ...createAuthDto, user });
    console.log('auth created', auth);
    try {
      await this.save(auth);
      return auth;
    } catch (error) {
      console.error(error);
    }
  }
}
