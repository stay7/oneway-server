import jwt from 'jsonwebtoken';

export class Token {
  constructor(public token: string) {}

  get expireDate() {
    const decodedToken = jwt.decode(this.token);
    return new Date(decodedToken['exp']);
  }
}
