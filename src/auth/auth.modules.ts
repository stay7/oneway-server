import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModules } from '../users/users.modules';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [
    UsersModules,
    PassportModule,
    JwtModule.register({ secret: `${process.env.JWT_SECRET}` }),
    TypeOrmModule.forFeature([UsersRepository, AuthRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, KakaoStrategy, JwtStrategy],
})
export class AuthModules {}
