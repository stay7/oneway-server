import { AuthProvider } from '../../auth/auth-provider.enum';

export class CreateUsersDto {
  providerKey: string;
  provider: AuthProvider;
  email: string;
}
