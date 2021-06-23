import { DoneStatus, NotifyStatus } from '../word.entity';

export class UpdateWordDto {
  name: string;
  meaning: string;
  usage: string;
  notifyStatus: NotifyStatus;
  doneStatus: DoneStatus;
}
