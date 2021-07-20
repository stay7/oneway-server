import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async createNewUser(createAuthDto: CreateAuthDto): Promise<User> {
    const user = await this.usersRepository.createUser();
    const auth = await this.authRepository.createAuth(createAuthDto, user);
    await this.groupsRepository.createGroup({ name: 'New Group' }, user);
    return auth.user;
  }

  renewAccessToken(refreshToken: string) {
    let returnAccess = '';
    let returnRefresh = refreshToken;

    const verified = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    if (!verified) throw new UnauthorizedException();

    const decoded = this.jwtService.decode(refreshToken);
    const [id, deviceId, exp] = [
      decoded['id'],
      decoded['deviceId'],
      decoded['exp'],
    ];

    const CHECK_DAY_MILLIS =
      parseInt(process.env.REFRESH_TOKEN_RENEW_EXPIRE_DAY) * 3600 * 1000 * 24;

    if (exp * 1000 < Date.now() + CHECK_DAY_MILLIS) {
      const payload = { id, deviceId };
      const access = this.credentialsRepository.issueAccessToken(payload);
      const refresh = this.credentialsRepository.issueRefreshToken(payload);

      returnAccess = access.token;
      returnRefresh = refresh.token;
    } else {
      returnAccess = this.jwtService.sign(
        { id, deviceId },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        },
      );
    }

    return { accessToken: returnAccess, refreshToken: returnRefresh };
  }
}
