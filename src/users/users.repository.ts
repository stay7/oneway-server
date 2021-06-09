import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUsersDto } from './dto/create-users.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUsersDto: CreateUsersDto) {
    const { email, provider, providerKey } = createUsersDto;
    const user = this.create({ email });
    console.log('user created', user);
    try {
      await this.save(user);
    } catch (error) {
      console.error(error);
    }
    return user;
  }
}
