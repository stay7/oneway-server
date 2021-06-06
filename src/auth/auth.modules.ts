import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModules } from '../users/users.modules';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthConroller } from './auth.conroller';

@Module({
  imports: [UsersModules, PassportModule],
  controllers: [AuthConroller],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModules {}
