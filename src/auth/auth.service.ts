import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/user.entity';
import { Auth } from './auth.entity';
import { GroupsRepository } from '../groups/groups.repository';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { CredentialsService } from '../credentials/credentials.service';
import { DevicesService } from '../device/devices.service';
import { Credential } from '../credentials/credential.entity';
import { GetTokenDto } from './dto/get-token.dto';
import { Device } from '../device/device.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    @InjectRepository(GroupsRepository)
    private groupsRepository: GroupsRepository,
    @InjectRepository(CredentialsRepository)
    private credentialsRepository,
    private jwtService: JwtService,
    private credentialsService: CredentialsService,
    private devicesService: DevicesService,
  ) {}

  async getAuth(providerKey: string): Promise<Auth> {
    return await this.authRepository.findOne(providerKey, {
      relations: ['user'],
    });
  }

  async getToken(getTokenDto: GetTokenDto) {
    const { id, deviceId, deviceName } = getTokenDto;
    let credential: Credential;
    let device: Device;

    const user = await this.usersRepository.findOne(id);
    if (!user) throw new UnauthorizedException();

    device = await this.devicesService.getDevice(user, deviceId);
    if (!device)
      device = await this.devicesService.createDevice(user, {
        deviceId,
        deviceName,
      });

    credential = await this.credentialsService.getCredential(user, device);
    if (!credential)
      credential = await this.credentialsService.createCredential(user, device);

    if (credential.isExpired)
      credential = await this.credentialsService.renewCredential(credential);

    return {
      accessToken: credential.accessToken,
      refreshToken: credential.refreshToken,
    };
  }

  issueTemporaryToken(user: User) {
    if (!user) throw new UnauthorizedException();
    return this.jwtService.sign(
      { id: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.TEMP_TOKEN_EXPIRE,
      },
    );
  }

  async createNewUser(createAuthDto: CreateAuthDto): Promise<User> {
    const user = await this.usersRepository.createUser();
    const auth = await this.authRepository.createAuth(createAuthDto, user);
    await this.groupsRepository.createGroup({ name: 'New Group' }, user);
    return auth.user;
  }

  async renewAccessToken(refreshToken: string) {
    let credential = await this.credentialsService.getCredentialByRefreshToken(
      refreshToken,
    );
    if (!credential) throw new NotFoundException();

    credential = await this.credentialsService.renewAccessToken(credential);
    return {
      accessToken: credential.accessToken,
      refreshToken: credential.refreshToken,
    };
  }
}
