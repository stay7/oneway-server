import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsRepository } from './credentials.repository';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Device } from '../device/device.entity';
import { Token } from '../types/token';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(CredentialsRepository)
    private credentialsRepository: CredentialsRepository,
    private jwtService: JwtService,
  ) {}

  async createCredential(
    accessToken: Token,
    refreshToken: Token,
    user: User,
    device: Device,
  ) {
    const accessTokenExpire = new Date();
    const refreshTokenExpire = new Date();
    const credential = this.credentialsRepository.create({
      accessToken: accessToken.token,
      accessTokenExpire,
      refreshToken: accessToken.token,
      refreshTokenExpire,
      user,
      device,
    });
    return await this.credentialsRepository.save(credential);
  }

  async getCredential(user: User, device: Device) {
    return await this.credentialsRepository.findOne({
      where: { user, device },
    });
  }

  async updateCredentialToken(
    credential,
    accessToken: Token,
    refreshToken: Token,
  ) {
    credential.accessToken = accessToken.token;
    credential.accessTokenExpire = accessToken.expireDate;
    credential.refreshToken = refreshToken.token;
    credential.refreshTokenExpire = refreshToken.expireDate;
    return await this.credentialsRepository.save(credential);
  }

  issueAccessToken(payload: JwtPayload): Token {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
    return new Token(token);
  }

  issueRefreshToken(payload: JwtPayload): Token {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });
    return new Token(token);
  }

  isValid(token: Token) {
    const verified = this.jwtService.verify(token.token);
  }
}
