import * as jwt from 'jsonwebtoken';

export class Token {
  constructor(public token: string) {}

  get expireDate() {
    console.log(this.token);
    const decodedToken = jwt.decode(this.token);
    return new Date(decodedToken['exp']);
  }
}
