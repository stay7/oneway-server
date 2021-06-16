import { IsOptional, IsString } from 'class-validator';

export class AddDeviceDto {
  @IsString()
  id: string;

  @IsOptional()
  deviceName: string;
}
