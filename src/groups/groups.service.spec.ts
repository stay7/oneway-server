import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { Test } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import * as faker from 'faker';
import { Repository } from 'typeorm';

const sampleGroup: Group = {
  id: faker.random.number,
  name: faker.random.name,
  createdAt: faker.random.date,
  updatedAt: faker.random.date,
  deletedAt: faker.random.date,
  words: [],
};

const user: User = {
  id: faker.random.uuid,
  timezone: faker.random.timezone,
  lastLoginAt: faker.random.date,
  createdAt: faker.random.date,
  updatedAt: faker.random.date,
  groups: [sampleGroup],
};

const mockGroupsRepository = () => ({
  createGroup: jest.fn((createGroupDto: CreateGroupDto, user: User) => {
    const group = new Group();
    const { name } = createGroupDto;
    group.id = faker.random.uuid;
    group.name = name;
    group.user = user;
    return group;
  }),
  findOne: jest.fn(),
  getGroups: jest.fn((user) => user.groups),
  updateGroups: jest.fn(),
});

describe('GroupService', () => {
  let groupsService: GroupsService;
  let groupsRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: GroupsRepository, useFactory: mockGroupsRepository },
      ],
    }).compile();
    groupsService = module.get(GroupsService);
    groupsRepository = module.get<Repository<Group>>(GroupsRepository);
  });

  it('defined', () => {
    expect(groupsService).toBeDefined();
    expect(groupsRepository).toBeDefined();
  });

  it('create group', async () => {
    const groupName = 'new group';
    const group = await groupsService.createGroup({ name: groupName }, user);

    expect(group).toHaveProperty('name');
    expect(group.name).toEqual(groupName);
  });

  it('get groups', async () => {
    const groups = await groupsService.getGroups(user);

    expect(groups).toHaveLength(user.groups.length);
    expect(groups).toEqual(user.groups);
  });
});
