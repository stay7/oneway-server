import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsRepository } from './groups.repository';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { User } from '../users/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsRepository)
    private groupsRepository: GroupsRepository,
  ) {}

  async createGroup(
    createGroupDto: CreateGroupDto,
    user: User,
  ): Promise<Group> {
    const group = await this.groupsRepository.createGroup(createGroupDto, user);
    const findedGroup = await this.groupsRepository.findOne(group.id, {
      relations: ['words'],
    });
    console.log(findedGroup);
    return findedGroup;
  }

  async getGroups(user: User): Promise<Group[]> {
    const groups = await this.groupsRepository.getGroups(user);
    console.log(groups);
    return groups;
  }
}
