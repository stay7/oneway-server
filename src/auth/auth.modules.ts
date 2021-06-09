import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModules } from '../users/users.modules';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModules, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModules {}
