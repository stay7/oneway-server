import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateWordDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  meaning: string;

  @IsOptional()
  @IsString()
  usage: string;

  @IsInt()
  groupId: number;
}
