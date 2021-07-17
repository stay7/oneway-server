import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsRepository } from './groups.repository';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { User } from '../users/user.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

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
    const foundGroup = await this.groupsRepository.findOne(group.id, {
      relations: ['words'],
    });
    console.log(foundGroup);
    return foundGroup;
  }

  async getGroups(user: User): Promise<Group[]> {
    const groups = await this.groupsRepository.getGroups(user);
    console.log(groups);
    return groups;
  }

  async updateGroup(updateGroupDto: UpdateGroupDto) {
    const { id, ...partial } = updateGroupDto;
    return await this.groupsRepository.update(id, partial);
  }
}
