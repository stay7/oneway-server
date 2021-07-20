import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsRepository } from './credentials.repository';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Device } from '../device/device.entity';
import { Token } from '../types/token';
import { Credential } from './credential.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(CredentialsRepository)
    private credentialsRepository: CredentialsRepository,
    private jwtService: JwtService,
  ) {}

  async getCredential(user: User, device: Device) {
    return await this.credentialsRepository.findOne({
      where: { user, device },
    });
  }

  async createCredential(user: User, device: Device): Promise<Credential> {
    const jwtPayload = { id: user.id, deviceId: device.id };
    const accessToken = this.issueAccessToken(jwtPayload);
    const refreshToken = this.issueRefreshToken(jwtPayload);
    console.log(accessToken.expireDate);

    const credential = this.credentialsRepository.create({
      accessToken: accessToken.token,
      accessTokenExpire: accessToken.expireDate,
      refreshToken: refreshToken.token,
      refreshTokenExpire: refreshToken.expireDate,
      user,
      device,
    });
    return await this.credentialsRepository.save(credential);
  }

  async renewCredential(credential: Credential): Promise<Credential> {
    console.log('renew credential', credential);

    const jwtPayload = {
      id: credential.user.id,
      deviceId: credential.device.id,
    };
    const accessToken = this.issueAccessToken(jwtPayload);
    const refreshToken = this.issueRefreshToken(jwtPayload);

    credential.accessToken = accessToken.token;
    credential.refreshToken = refreshToken.token;
    credential.accessTokenExpire = accessToken.expireDate;
    credential.refreshTokenExpire = refreshToken.expireDate;
    return await this.credentialsRepository.save(credential);
  }

  private issueAccessToken(payload: JwtPayload): Token {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
    return new Token(token);
  }

  private issueRefreshToken(payload: JwtPayload): Token {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });
    return new Token(token);
  }
}
