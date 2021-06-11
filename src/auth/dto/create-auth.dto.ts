import { IsEnum, IsString } from 'class-validator';
import { AuthProvider } from '../auth-provider.enum';

export class CreateAuthDto {
  @IsString()
  providerKey: string;

  @IsEnum(AuthProvider)
  provider: AuthProvider;
}
