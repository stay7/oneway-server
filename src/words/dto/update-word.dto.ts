import { DoneStatus, NotifyStatus } from '../word.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateWordDto {
  @IsString()
  name: string;

  @IsString()
  meaning: string;

  @IsString()
  usage: string;

  @IsOptional()
  notifyStatus: NotifyStatus;

  @IsEnum(DoneStatus)
  doneStatus: DoneStatus;
}
