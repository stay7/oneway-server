import { IsString } from 'class-validator';

class LoginDto {
  @IsString()
  id: string;
  @IsString()
  deviceId: string;
  @IsString()
  deviceName: string;
}
