import { IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  deviceId: string;

  @IsOptional()
  deviceName: string;
}
