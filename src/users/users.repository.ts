import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser() {
    const user = this.create({});
    console.log('user created', user);
    try {
      await this.save(user);
    } catch (error) {
      console.error(error);
    }
    return user;
  }
}
