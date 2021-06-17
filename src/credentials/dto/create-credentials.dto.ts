export class CreateCredentialDto {
  accessToken: string;
  accessTokenExpire: Date;
  refreshToken: string;
  refreshTokenExpire: Date;
}
