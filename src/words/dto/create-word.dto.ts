import { IsOptional, IsString } from 'class-validator';

export class CreateWordDto {
  @IsString()
  name: string;

  @IsOptional()
  meaning: string;

  @IsOptional()
  usage: string;
}
