import { User } from '../../users/user.entity';
import { Device } from '../../device/device.entity';
import { Token } from '../../types/token';

export class CreateCredentialDto {
  accessToken: string;
  accessTokenExpire: Date;
  refreshToken: string;
  refreshTokenExpire: Date;
  user: User;
  device: Device;
}
