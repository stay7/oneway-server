import { Controller } from '@nestjs/common';

@Controller()
export class GroupsController {
  //TODO: Get groups
  //동기화 할 때 단어를 덮어써야하기에 단어도 줘야한다.
  //TODO: Get lastes groups (client_last_modified_date)
  //클라이언트의 마지막 수정날짜보다 늦게 업데이트된 그룹을 다 받아오기
  //알림 취소는 인터넷이 연결되지 않은 클라이언트에서 실행하면??
  //TODO: Add groups
  //TODO: Delete groups
  //TODO: Rename groups
}
