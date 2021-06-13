import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsRepository } from './groups.repository';
import { AuthModules } from '../auth/auth.modules';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsRepository]), AuthModules],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
