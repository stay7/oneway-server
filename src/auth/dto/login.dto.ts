import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  id: string;

  @IsString()
  deviceId: string;
}
