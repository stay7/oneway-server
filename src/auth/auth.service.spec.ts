import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersRepository } from '../users/users.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { GroupsRepository } from '../groups/groups.repository';

const mockUsersRepository = () => ({});
const mockAuthRepository = () => ({});
const mockGroupRepository = () => ({});

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
      providers: [
        AuthService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: AuthRepository, useFactory: mockAuthRepository },
        { provide: GroupsRepository, useFactory: mockGroupRepository },
      ],
    }).compile();
    authService = module.get(AuthService);
  });

  it('is defined', () => {
    expect(authService).toBeDefined();
  });
});
