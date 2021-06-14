import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthModules } from '../auth/auth.modules';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), AuthModules],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModules {}
