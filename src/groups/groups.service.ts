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

  createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsRepository.createGroup(createGroupDto);
  }

  getGroups(user: User): Promise<Group[]> {
    return this.groupsRepository.getGroups(user);
  }
}
