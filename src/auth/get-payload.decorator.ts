import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken');
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];
    const { iat, exp, ...payload } = jwt.decode(token);

    return payload;
  },
);
