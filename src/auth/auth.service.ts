import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/user.entity';
import { Auth } from './auth.entity';
import { GroupsRepository } from '../groups/groups.repository';
import { JwtPayload } from './jwt-payload.interface';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { CredentialsService } from '../credentials/credentials.service';
import { DevicesService } from '../device/devices.service';
import { Credential } from '../credentials/credential.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    @InjectRepository(GroupsRepository)
    private groupRepository: GroupsRepository,
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

  async login(req): Promise<Credential> {
    const { user, deviceId, deviceName } = req;

    const payload = { id: user.id, deviceId };

    const accessToken = this.credentialsService.issueAccessToken(payload);
    const refreshToken = this.credentialsService.issueRefreshToken(payload);
    let device = await this.devicesService.getDevice(deviceId);

    if (!device) {
      device = await this.devicesService.createDevice({ deviceId, deviceName });
      return this.credentialsService.createCredential(
        accessToken,
        refreshToken,
        user,
        device,
      );
    }

    const credential = await this.credentialsService.getCredential(
      user,
      device,
    );

    return await this.credentialsRepository.updateCredentialToken(
      credential,
      accessToken,
      refreshToken,
    );
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
