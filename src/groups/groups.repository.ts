import { EntityRepository, Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { User } from '../users/user.entity';

@EntityRepository(Group)
export class GroupsRepository extends Repository<Group> {
  async createGroup(createGroupDto: CreateGroupDto, user: User) {
    const group = this.create({ ...createGroupDto, user });
    await this.save(group);
    return group;
  }

  async getGroups(user: User): Promise<Group[]> {
    const query = this.createQueryBuilder(`group`);
    query.where({ user: user });

    return await query.getMany();
  }
}
