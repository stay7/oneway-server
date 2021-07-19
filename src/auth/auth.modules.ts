import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';
import { GroupsRepository } from '../groups/groups.repository';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { DevicesRepository } from '../device/devices.repository';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { CredentialsService } from '../credentials/credentials.service';
import { DevicesService } from '../device/devices.service';
import { UsersService } from '../users/users.service';
import { UsersModules } from '../users/users.modules';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: `${process.env.JWT_SECRET}` }),
    TypeOrmModule.forFeature([
      UsersRepository,
      AuthRepository,
      GroupsRepository,
      CredentialsRepository,
      DevicesRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    KakaoStrategy,
    FacebookStrategy,
    JwtStrategy,
    CredentialsService,
    DevicesService,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModules {}
