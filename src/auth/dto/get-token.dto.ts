import { IsString } from 'class-validator';

export class GetTokenDto {
  @IsString()
  id: string;
  @IsString()
  deviceId: string;
  @IsString()
  deviceName: string;
}
