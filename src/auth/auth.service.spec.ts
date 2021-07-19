import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersRepository } from '../users/users.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { GroupsRepository } from '../groups/groups.repository';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { CredentialsService } from '../credentials/credentials.service';
import { DevicesService } from '../device/devices.service';
import { DevicesRepository } from '../device/devices.repository';

const mockUsersRepository = () => ({});
const mockAuthRepository = () => ({});
const mockGroupRepository = () => ({});
const mockCredentialsRepository = () => ({});
const mockDevicesRepository = () => ({});

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
      providers: [
        AuthService,
        CredentialsService,
        DevicesService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: AuthRepository, useFactory: mockAuthRepository },
        { provide: GroupsRepository, useFactory: mockGroupRepository },
        { provide: DevicesRepository, useFactory: mockDevicesRepository },
        {
          provide: CredentialsRepository,
          useFactory: mockCredentialsRepository,
        },
      ],
    }).compile();
    authService = module.get(AuthService);
  });

  it('is defined', () => {
    expect(authService).toBeDefined();
  });
});
