import { EntityRepository, Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@EntityRepository(Group)
export class GroupsRepository extends Repository<Group> {
  async createGroup(createGroupDto: CreateGroupDto) {
    const group = this.create({ ...createGroupDto });
    await this.save(group);
    return group;
  }
}
