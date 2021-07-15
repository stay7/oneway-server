import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;
}
