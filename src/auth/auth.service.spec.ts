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
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthProvider } from './auth-provider.enum';
import * as faker from 'faker';
import { User } from '../users/user.entity';
import { CreateGroupDto } from '../groups/dto/create-group.dto';
import { Group } from '../groups/group.entity';

const mockUsersRepository = () => ({
  createUser: jest.fn(() => {
    return {
      id: faker.datatype.uuid(),
      timezone: faker.address.timeZone(),
      lastLoginAt: faker.date.recent(),
      groups: [],
    };
  }),
});
const mockAuthRepository = () => ({
  createAuth: jest.fn((createAuthDto: CreateAuthDto, user: User) => {
    return { ...createAuthDto, user };
  }),
});
const mockGroupRepository = () => ({
  createGroup: jest.fn((createGroupDto: CreateGroupDto, user: User) => {
    const group: Group = {
      id: faker.datatype.number(),
      name: faker.lorem.word(),
    };
    user.groups.push(group);
    return group;
  }),
});
const mockCredentialsRepository = () => ({});
const mockDevicesRepository = () => ({});

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

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
    jwtService = module.get(JwtService);
  });

  it('is defined', () => {
    expect(authService).toBeDefined();
    expect(CredentialsService).toBeDefined();
    expect(DevicesService).toBeDefined();
    expect(UsersRepository).toBeDefined();
    expect(AuthRepository).toBeDefined();
    expect(GroupsRepository).toBeDefined();
    expect(DevicesRepository).toBeDefined();
    expect(CredentialsRepository).toBeDefined();
  });

  it('create new user', async () => {
    const createAuthDto: CreateAuthDto = {
      provider: AuthProvider.KAKAO,
      providerKey: faker.datatype.uuid(),
    };
    const user = await authService.createNewUser(createAuthDto);
    expect(user).toHaveProperty('id');
  });

  it('issue temporary token', async () => {
    const user = await mockUsersRepository().createUser();
    const spyJwtService = jest.spyOn(jwtService, 'sign');
    const token = authService.issueTemporaryToken(user);

    expect(spyJwtService).toBeCalledTimes(1);
    expect(spyJwtService).toBeCalledWith(
      { id: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.TEMP_TOKEN_EXPIRE,
      },
    );
    expect(token).toBe(token);
  });
});
