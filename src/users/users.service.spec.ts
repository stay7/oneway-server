import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Test } from '@nestjs/testing';

const mockUsersRepository = () => ({});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
  });

  it('is defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });
});
