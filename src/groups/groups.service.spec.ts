import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { Test } from '@nestjs/testing';

const mockUserRepository = () => ({
  createGroups: jest.fn(),
  getGroups: jest.fn(),
  updateGroups: jest.fn(),
});

describe('GroupService', () => {
  let groupsService: GroupsService;
  let groupsRepository: GroupsRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: GroupsRepository, useFactory: mockUserRepository },
      ],
    }).compile();
    groupsService = module.get(GroupsService);
    groupsRepository = module.get(GroupsRepository);
  });

  it('defined', () => {
    expect(groupsService).toBeDefined();
    expect(groupsRepository).toBeDefined();
  });
});
