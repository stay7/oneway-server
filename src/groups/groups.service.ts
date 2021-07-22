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
    return await this.groupsRepository.createGroup(createGroupDto, user);
  }

  async getGroups(user: User): Promise<Group[]> {
    return await this.groupsRepository.getGroups(user);
  }

  async updateGroup(updateGroupDto: UpdateGroupDto) {
    const { id, name } = updateGroupDto;
    const group = await this.groupsRepository.findOne(id);
    group.name = name;
    return await this.groupsRepository.save(group);
  }

  async deleteGroup(groupId: number) {
    return await this.groupsRepository.delete(groupId);
  }
}
