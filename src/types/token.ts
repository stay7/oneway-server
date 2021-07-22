import * as jwt from 'jsonwebtoken';

export class Token {
  constructor(public token: string) {}

  get expireDate() {
    const decoded = jwt.decode(this.token);
    return new Date(decoded['exp'] * 1000);
  }
}
