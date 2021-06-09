import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsRepository } from './groups.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsRepository])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
