import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('groups')
@UseGuards(AuthGuard())
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  createGroups(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get()
  getGroups(@GetUser() user: User): Promise<Group[]> {
    return this.groupsService.getGroups(user);
  }

  //TODO: Get groups
  //동기화 할 때 단어를 덮어써야하기에 단어도 줘야한다.
  //TODO: Get lastes groups (client_last_modified_date)
  //클라이언트의 마지막 수정날짜보다 늦게 업데이트된 그룹을 다 받아오기
  //알림 취소는 인터넷이 연결되지 않은 클라이언트에서 실행하면??
  //TODO: Add groups
  //TODO: Delete groups
  //TODO: Rename groups
}
