import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModules } from '../user/user.modules';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthConroller } from './auth.conroller';

@Module({
  imports: [UserModules, PassportModule],
  controllers: [AuthConroller],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModules {}
